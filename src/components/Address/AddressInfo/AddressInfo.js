import React, { Component } from 'react';
import QRCode from'qrcode.react';
import PropTypes from 'prop-types';
import './AddressInfo.scss';

export default class AddressInfo extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      qrSize: 200
    };
  }  
  render() {             
    if (this.props.hasAddressData) {
      return (
        <div id="AddressInfo" className="row">        
          <div>
            <QRCode
              size={this.state.qrSize}
              value={`${this.props.address}`} />,
          </div>        
          <div>                
            <table>      
              <tbody>
                <tr>
                  <td>Address:</td>
                  <td>{this.props.address}</td>
                </tr>
                <tr>
                  <td>Hash160:</td>
                  <td>{this.props.hash160}</td>
                </tr>
                <tr>
                  <td>Final Balance:</td>
                  <td>{this.props.final_balance}</td>
                </tr>
                <tr>
                  <td>Total Tx:</td>
                  <td>{this.props.n_tx}</td>
                </tr>
                <tr>
                  <td>Total Received:</td>
                  <td>{this.props.total_received}</td>
                </tr>
                <tr>
                  <td>Total Sent:</td>
                  <td>{this.props.total_sent}</td>
                </tr>
              </tbody>              
            </table>
          </div>
        </div>
      );
    } else {
      return null;
    }     
  }
}

AddressInfo.propTypes = {
  address: PropTypes.string,  
  hasAddressData: PropTypes.bool,
  hash160: PropTypes.string,
  final_balance: PropTypes.number,
  n_tx: PropTypes.number,
  total_received: PropTypes.number,
  total_sent: PropTypes.number,
};