import React, { Component } from 'react';
import TxInfo from './TxInfo/TxInfo';
import PropTypes from 'prop-types';
import './TxList.scss';


export default class TxList extends Component { 
  render() {             
    if (this.props.txs && this.props.txs.length > 0) {
      return (
        <div id="TxList">         
          <small>Click a tx to view more info...</small> 
          { this.props.txs.map((tx) =>             
            <TxInfo key={tx.hash} tx={tx}/>  
          ) }  
          <MoreTx 
            hasMoreTx={this.props.hasMoreTx}  
            getMoreTx={this.props.getMoreTx}/>           
        </div>
      );    
    } else {
      return null;
    }     
  }
}

function MoreTx({ hasMoreTx, getMoreTx })  {
  if (hasMoreTx) {
    return (
      <div className="row">
        <button className="load-more" onClick={getMoreTx}>Load More</button>
      </div> 
    );
  } else {
    return null;
  }
}

TxList.propTypes = {
  txs: PropTypes.array,
  hasMoreTx: PropTypes.bool,
  getMoreTx: PropTypes.func
};
