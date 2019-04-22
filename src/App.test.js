import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import App from './App';
import tx from '../mocks/tx';
import { StaticRouter } from 'react-router';

describe('H160', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StaticRouter location="/"><App /></StaticRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });    
});
