import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import AddressInfo from './AddressInfo';
import address from '../../../../mocks/addr';

describe('Address', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddressInfo />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('renders the address info', () => {
    const component = create(<AddressInfo 
      hasAddressData={true}
      address={address.address}
      hash160={address.hash160}
      final_balance={address.final_balance}
      n_tx={address.n_tx}
      total_received={address.total_received}
      total_sent={address.total_sent}/>);
    const instance = component.getInstance();    
    
    expect(instance.props.address).toBe(address.address); 
    expect(instance.props.hash160).toBe(address.hash160); 
    expect(instance.props.final_balance).toBe(address.final_balance); 
    expect(instance.props.n_tx).toBe(address.n_tx); 
    expect(instance.props.total_received).toBe(address.total_received); 
    expect(instance.props.total_sent).toBe(address.total_sent); 
  });
  it('renders a QR Code for the address', () => {
    const component = create(<AddressInfo 
      hasAddressData={true}
      address={address.address}
      hash160={address.hash160}
      final_balance={address.final_balance}
      n_tx={address.n_tx}
      total_received={address.total_received}
      total_sent={address.total_sent}/>);
    const instance = component.getInstance();    
    
    expect(instance.state.qrSize).toBe(200);
  });
});
