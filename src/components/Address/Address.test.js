import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import { StaticRouter } from 'react-router';
import Address from './Address';
import address from '../../../mocks/addr';

describe('Address', () => {
  const testAddress = "1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA";

  it('renders the address info', () => {
    const component = create(<StaticRouter location="/address/1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA">
      <Address 
        hasAddressData={true}
        match={{params: {addr: "1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA"}}}
        address={address.address}
        hash160={address.hash160}
        final_balance={address.final_balance}
        n_tx={address.n_tx}
        total_received={address.total_received}
        total_sent={address.total_sent}/></StaticRouter>);    
  });
  it('renders an error for an address', () => {
    const component = create(<StaticRouter location="/address/1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA"><Address 
      error={true}
      match={{params: {addr: "1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA"}}}
      address={testAddress}/></StaticRouter>);          
  });
  it('renders a spinner while searching', () => {
    const component = create(<StaticRouter location="/address/1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA"><Address 
      match={{params: {addr: "1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA"}}}  
      pageIsLoaded={true}/></StaticRouter>);            
  });
});
