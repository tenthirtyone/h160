import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Address from './components/Address/Address';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import './App.scss';

const addressAPI = 'https://blockchain.info/rawaddr/';
const socketAPI = 'wss://ws.blockchain.info/inv';
const priceAPI = 'https://api.coinbase.com/v2/prices/spot?currency=USD';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      hash160: null,
      final_balance: null,
      n_tx: null,
      total_received: null,
      total_sent: null,
      txs: [],
      pageSize: 10,
      offset: 0,
      pageIsLoaded: true,
      hasAddressData: false,
      spotPrice: null,
      error: false,
      ws: null
    };
    
    this.getSpotPrice();
    setInterval(() => {
      this.getSpotPrice();
    }, 60 * 1000);
  }

  getSpotPrice = async () => {
    let response;
    let json;
    try {      
      response = await fetch(`${priceAPI}`);
      json = await response.json();
    } catch (e) {                              
      this.setState({
        spotPrice: null
      });
    }    
    
    if (json.data && json.data.amount) {
      const { amount } = json.data;
      
      const decimalPlaces = (amount.length - 1) - amount.indexOf('.');

      await this.setState({
        spotPrice: parseInt(amount.replace('.', ''), 10) / Math.pow(10, decimalPlaces)
      });      
    }
  }

  searchAddress = async (address) => {    
    if (this.props.history.location !== `/address/${address}`) {
      this.props.history.push(`/address/${address}`);
      this.getTxData(address);
    }            
  }

  getTxData = async (address) => {    
    await this.setState({   
      address: address,   
      pageIsLoaded: false,
      hasAddressData: false,
      error: false,
      offset: 0,
      txs: []
    });
    this.getTxsForAddress();
    this.listenForTx();
  }

  getTxsForAddress = async (address = this.state.address) => {
    let response;
    let json;

    try {
      const endpoint = `${address}?cors=true&limit=${this.state.pageSize}&offset=${this.state.offset}`;
      response = await fetch(`${addressAPI}${endpoint}`);
      json = await response.json();
    } catch (e) {                              
      return this.setState({
        address: "",
        pageIsLoaded: true,
        hasAddressData: false,
        error: true,
        txs: []
      });
    }        
    
    if (this.state.txs) {
      json.txs = this.state.txs.concat(json.txs);
    }

    this.setState({
      ...json,               
      error: false,
      pageIsLoaded: true,
      hasAddressData: true,
    });     
  }

  getMoreTx = async () => {
    await this.setState({
      offset: this.state.offset + this.state.pageSize
    }); 
    
    if (this.state.offset <= this.state.n_tx - this.state.pageSize) {      
      this.getTxsForAddress();
      this.setState({
        pageIsLoaded: false
      });
    }    
  }

  addTransaction = (tx) => {
    this.setState(state => {
      const txs = state.txs;
      txs.unshift(tx);
      return {
        txs,
        n_tx: this.state.n_tx + 1
      };
    });    
    this.updateBalances(tx);
  }

  updateBalances(tx) {    
    tx.inputs.forEach(input => {
      if (input.prev_out.addr === this.state.address) {
        this.setState({
          total_sent: (this.state.total_sent + (input.value || 0 )),
          final_balance: (this.state.final_balance - (input.value || 0 ))
        });
      }
    });

    tx.out.forEach(output => {
      if (output.addr === this.state.address) {
        this.setState({
          total_received: (this.state.total_received + (output.value || 0)),
          final_balance: (this.state.final_balance + (output.value || 0))
        });
      }
    });
  }

  listenForTx() {
    if (this.state.ws) {
      this.state.ws.close();      
    }
    const ws = new WebSocket(socketAPI);

    ws.onopen = () => {    
      ws.send(`{"op":"ping"}`);      
      ws.send(`{
        "op":"addr_sub", 
        "addr":"${this.state.address}"
      }`);
    };

    ws.onmessage = event => {      
      let { data } = event;      
      data = JSON.parse(data);
      
      if (data && data.x) {
        this.addTransaction(data.x);
      } 
            
      this.setState({
        offset: this.state.offset + 1
      });  
    };    

    this.setState({
      ws
    });
  }

  render() {
    return (
      <div className="App">
        <Header 
          searchAddress={this.searchAddress}
          address={this.state.address}/>
          
        <Route exact path="/" 
          render={(props) => <Home {...props}             
            searchAddress={this.searchAddress}/> } />
          
        <Route exact path="/h160" 
          render={(props) => <Home {...props}             
            searchAddress={this.searchAddress}/> } />
            
        <Route path="/address/:addr"
          render={(props) => <Address {...props}
            {...this.state}
            getTxData={this.getTxData} 
            spotPrice={this.state.spotPrice}           
            getMoreTx={this.getMoreTx}
            hasMoreTx={this.state.offset < this.state.n_tx - this.state.pageSize}/>}  />
          
        <Footer 
          spotPrice={this.state.spotPrice}/>  
      </div>
    );
  }
}

export default withRouter(App);

App.propTypes = {
  history: PropTypes.object
};