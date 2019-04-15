import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

describe('Address', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home isHome={true}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('renders without crashing if isHome is false', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home isHome={false}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
});
