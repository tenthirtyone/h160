import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import Address from './Address
import address from '../../../mocks/addr';

describe('Address', () => {
  const testAddress = "1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA";

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Address />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('renders the address info', () => {
    const component = create(<Address 
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
  it('renders an error for an address', () => {
    const component = create(<Address 
      error={true}
      address={testAddress}/>);
    const instance = component.getInstance();    
    
    expect(instance.props.error).toBe(true); 
    expect(instance.props.address).toBe(testAddress);     
  });
  it('renders a spinner while searching', () => {
    const component = create(<Address 
      pageIsLoaded={true}/>);
    const instance = component.getInstance();    
    
    expect(instance.props.pageIsLoaded).toBe(true); 
  });
});
