import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import TxInfo from './TxInfo';
import tx from '../../mocks/tx';

describe('H160', () => {
  it('renders without crashing ', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TxInfo tx={tx}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('renders without crashing if no Tx is passed', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TxInfo />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('Shows the Transaction Info when given Tx data', () => {    
    const component = create(<TxInfo tx={tx}/>);
    const instance = component.getInstance();
    
    expect(instance.props.tx).toBe(tx);    
  });
  it('Toggles the hidden class on the Tx Outputs', () => {    
    const component = create(<TxInfo tx={tx}/>);
    const instance = component.getInstance();
    
    expect(instance.state.display).toBe('hidden');
    instance.toggleDisplay();
    expect(instance.state.display).toBe('');    
    instance.toggleDisplay();
    expect(instance.state.display).toBe('hidden');
  });
});


