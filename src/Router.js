import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const Root = () => (  
  <div>
    <Router>
      <App />
    </Router>
  </div>
  
);

export default Root;
