import React, { Component } from 'react'
import './Home.scss'
import SearchBox from './SearchBox'
import PropTypes from 'prop-types'

export default class Home extends Component {
  render() {
    if (this.props.isHome) {
      return (
        <main className="Home">                
          <div className="container">
            <h2>Hash160</h2>
            <h4>Bitcoin Address Explorer</h4>
            <SearchBox 
              onSearch={this.props.onSearch} 
              placeholderText="Enter a Bitcoin Address"/>
          </div>                
        </main>
      )
    } else {
      return null;
    }        
  }
}

Home.propTypes = {
  isHome: PropTypes.bool,
  onSearch: PropTypes.func
}