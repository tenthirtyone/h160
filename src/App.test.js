import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import App from './App';
import tx from '../mocks/tx';

describe('H160', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('adds a tx to the tx list', () => {    
    const component = create(<App />);
    const instance = component.getInstance();    
    expect(instance.state.txs.length).toBe(0);    
    instance.addTransaction(tx);
    expect(instance.state.txs.length).toBe(1);    
  });
});
