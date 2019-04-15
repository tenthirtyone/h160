import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Address from './components/Address';
import './App.scss';

const addressAPI = 'https://blockchain.info/rawaddr/';
const socketAPI = 'wss://ws.blockchain.info/inv';

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
      isHome: true,
      isAddress: false,
      pageIsLoaded: true,
      hasAddressData: false,
      error: false,
      ws: null
    };
  }

  onSearch = async (address) => {    
    await this.setState({
      address: address,
      isHome: false,
      pageIsLoaded: false,
      hasAddressData: false,
      isAddress: true,
      error: false,
      offset: 0,
      txs: []
    });

    this.getAddressTxs();
    this.listenForTx();
  }

  getAddressTxs = async () => {
    let response;
    let json;

    try {
      const endpoint = `${this.state.address}?cors=true&limit=${this.state.pageSize}&offset=${this.state.offset}`;
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
      this.getAddressTxs();
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
          onSearch={this.onSearch}
          address={this.state.address}></Header>
        <Home
          isHome={this.state.isHome}
          onSearch={this.onSearch}          
        ></Home>
        <Address 
          {...this.state}
          isAddress={this.state.isAddress}
          searchAddress={this.searchAddress}
          getMoreTx={this.getMoreTx}
          hasMoreTx={this.state.offset < this.state.n_tx - this.state.pageSize}
        ></Address>  
        <Footer></Footer>  
      </div>
    );
  }
}

export default App;

