import React, { Component } from 'react';
import './Home.scss';
import SearchBox from '../SearchBox/SearchBox';
import PropTypes from 'prop-types';

export default class Home extends Component {
  render() {    
    return (
      <main className="Home">                
        <div className="container">
          <h2>Hash160</h2>
          <h4>Bitcoin Address Explorer</h4>
          <SearchBox 
            searchAddress={this.props.searchAddress} 
            placeholderText="Enter a Bitcoin Address"/>
        </div>                
      </main>
    );    
  }
}

Home.propTypes = {
  searchAddress: PropTypes.func
};