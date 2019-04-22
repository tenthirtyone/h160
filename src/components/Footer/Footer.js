import React, { Component } from 'react';
import './Footer.scss';

function SpotPrice( { spotPrice } ) {
  if (spotPrice) {
    return (
      <div>
        <span>
          BTC:
        </span>
        <span className="spot-price">        
          ${ spotPrice }
        </span> 
      </div>
    );
  } else {
    return null;
  }
}

export default class Footer extends Component {
  render() {
    return (
      <footer className="Footer">                
        <div className="container">
          <SpotPrice spotPrice={this.props.spotPrice}/>  
        </div>                
      </footer>
    );
  }
}