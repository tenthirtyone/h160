import React, { Component } from 'react';
import SearchBox from '../SearchBox/SearchBox.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className="Header">                
        <div className="container">                   
          <span>
            <Link to="/"> H160 </Link>
          </span>                   
          <SearchBox 
            searchAddress={this.props.searchAddress}
            placeholderText="Enter a Bitcoin Address"/>
        </div>                
      </header>);
  }
}

Header.propTypes = {
  searchAddress: PropTypes.func,   
  spotPrice: PropTypes.string 
};