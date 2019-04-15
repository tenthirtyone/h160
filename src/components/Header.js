import React, { Component } from 'react'
import SearchBox from './SearchBox.js'
import PropTypes from 'prop-types';
import './Header.scss'

export default class Header extends Component {

  render() {
    return (
      <header className="Header">                
        <div className="container">
                    
          <span>
                        H160
          </span>
                    
          <SearchBox 
            onSearch={this.props.onSearch}
            placeholderText="Enter a Bitcoin Address"/>
        </div>
                
      </header>)
  }
}

Header.propTypes = {
  onSearch: PropTypes.func,    
}