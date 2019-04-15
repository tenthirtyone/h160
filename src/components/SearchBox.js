import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class SearchBox extends Component {
  getInputValue = () => {
    return this.input.value
  }
  
  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleSearchClick()
      this.input.value = '';
    }
  }

  handleSearchClick = () => {
    this.props.onSearch(this.getInputValue());
  }

  render() {
    return (            
      <input
        ref={(input) => this.input = input}
        defaultValue={this.props.value}
        onKeyUp={this.handleKeyUp}
        placeholder={this.props.placeholderText} />
    )
  }
}

SearchBox.propTypes = {
  onSearch: PropTypes.func,
  value: PropTypes.string,
  placeholderText: PropTypes.string
}