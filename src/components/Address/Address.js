import React, { Component } from 'react';
import AddressInfo from './AddressInfo/AddressInfo';
import TxList from './TxList/TxList';
import PropTypes from 'prop-types';
import './Address.scss';

export default class Address extends Component { 
  constructor(props) {
    super(props);
    props.getTxData(props.match.params.addr);   
  }

  componentDidUpdate(){
    window.onpopstate  = () => {
      this.props.getTxData(this.props.match.params.addr);
    };  
  }

  render() {                            
    return (                        
      <main className="Address">                            
        <ErrorMsg 
          didError={this.props.error}
          address={this.props.match.params.addr}/>
        <div className="container">                    
          
          <Spinner 
            pageIsLoaded={this.props.pageIsLoaded} />
                        
          <AddressInfo
            hasAddressData={this.props.hasAddressData}
            address={this.props.match.params.addr}
            hash160={this.props.hash160}
            final_balance={this.props.final_balance}
            n_tx={this.props.n_tx}
            total_received={this.props.total_received}
            total_sent={this.props.total_sent}
            spotPrice={this.props.spotPrice}/>
                
          <TxList 
            getMoreTx={this.props.getMoreTx}
            hasMoreTx={this.props.hasMoreTx}
            spotPrice={this.props.spotPrice}
            txs={this.props.txs}/>

        </div>                
      </main>);          
  }
}

function ErrorMsg({ didError }) {    
  if (didError) {
    return (<div className="error">Error, API Fetch Failed.</div>);
  }
  return null;
}

function Spinner({ pageIsLoaded }) {        
  if (!pageIsLoaded) {        
    return (
      <div className="spinner-box">                       
        <div className="spinner"></div>
      </div>);
  }
  return null;
}

Address.propTypes = {  
  match: PropTypes.object,
  error: PropTypes.bool,
  address: PropTypes.string,
  pageIsLoaded: PropTypes.bool,
  hasAddressData: PropTypes.bool,
  hash160: PropTypes.string,
  final_balance: PropTypes.number,
  n_tx: PropTypes.number,
  total_received: PropTypes.number,
  total_sent: PropTypes.number,
  getMoreTx: PropTypes.func,
  hasMoreTx: PropTypes.bool,
  txs: PropTypes.array,
  spotPrice: PropTypes.number,
  didError: PropTypes.bool,
  getTxData: PropTypes.func
};

ErrorMsg.propTypes = {
  didError: PropTypes.bool
};

Spinner.propTypes = {
  pageIsLoaded: PropTypes.bool
};