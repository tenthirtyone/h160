import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends Component {
  getInputValue = () => {
    return this.input.value;
  }
  
  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch();
      this.input.value = '';
    }
  }

  handleSearch = () => {
    this.props.searchAddress(this.getInputValue());
  }

  render() {
    return (            
      <input
        ref={(input) => this.input = input}
        defaultValue={this.props.value}
        onKeyUp={this.handleKeyUp}
        placeholder={this.props.placeholderText} />
    );
  }
}

SearchBox.propTypes = {
  searchAddress: PropTypes.func,
  value: PropTypes.string,
  placeholderText: PropTypes.string
};