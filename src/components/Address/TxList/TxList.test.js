import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import TxList from './TxList';
import txs from '../../../../mocks/txs';

describe('H160', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TxList txs={txs}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('renders without crashing with no data passed', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TxList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('renders a Load More button if hasMoreTx is true', () => {       
    const component = create(<TxList txs={txs} hasMoreTx={true} />);
    const instance = component.getInstance();    
    expect(instance.props.hasMoreTx).toBe(true);    
  });
  it('gets more tx on click', () => {    
    const component = create(<TxList txs={txs} hasMoreTx={true} getMoreTx={() => true} />);
    const instance = component.getInstance();    
    
    const moreTx = instance.props.getMoreTx();
    expect(moreTx).toBe(true);
  });
});
