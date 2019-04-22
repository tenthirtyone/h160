import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { StaticRouter } from 'react-router';

describe('Address', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <StaticRouter location="/">
      <Header /></StaticRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });  
});
