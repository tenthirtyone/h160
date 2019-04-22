import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TxInfo.scss';

export default class TxInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'hidden'
    };
  }

  toggleDisplay = () => {
    if (this.state.display === 'hidden') {
      this.setState({
        display: ''
      });
    } else {
      this.setState({
        display: 'hidden'
      });
    }
  }

  render() {
    if (this.props.tx) {      
      return (
        <div className="tx-info item">
          <div onClick={this.toggleDisplay}>
            <div className="tx-price">
              <TxValue inputs={this.props.tx.inputs} spotPrice={this.props.spotPrice}/>
            </div>
            {this.props.tx.hash || ''}
          </div>        

          <table className={this.state.display}>                
            <OutputDetails outputs={this.props.tx.out} spotPrice={this.props.spotPrice} />
          </table>
        </div>    
      );
    } else {
      return null;
    }
    
  }
}

function OutputDetails({ outputs }) {
  return (
    outputs.map(output => 
      <tbody key={output.script}>
        <tr>
          <td>
                address:
          </td>
          <td>
            {output.addr}
          </td>
        </tr>
        <tr>                      
          <td>
                script:
          </td>
          <td>
            {output.script}
          </td>
        </tr>
        <tr>                      
          <td>
                BTC:
          </td>
          <td>
            {output.value}
          </td>
        </tr>
      </tbody>
    )
  );
}

function SpotPriceUSD(satoshis, spotPrice) {   
  return `$ ${Math.round((satoshis / Math.pow(10, 8)) * spotPrice * 100) / 100}`; 
}

function TxValue({ inputs, spotPrice }) {
  let satoshis = 0;
  inputs.forEach(input => {
    satoshis += input.prev_out.value;
  });
  
  return SpotPriceUSD(satoshis, spotPrice);
}

TxInfo.propTypes = {
  tx: PropTypes.object,
  spotPrice: PropTypes.number
};