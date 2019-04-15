import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import SearchBox from './SearchBox';

const testAddress = "1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA";

describe('Address', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBox />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
  it('renders a default placeholder text', () => {
    const component = create(<SearchBox placeholderText={"Placeholder Text"} />);
    const instance = component.getInstance();    
    expect(instance.props.placeholderText).toBe("Placeholder Text");    
  });
  it('renders a default search value', () => {
    const component = create(<SearchBox value={"Search Value"} />);
    const instance = component.getInstance();    
    expect(instance.props.value).toBe("Search Value");    
  });
  it('passes the search value on enter', () => {    
    const component = create(<SearchBox onSearch={(addr) => addr}/>);
    const instance = component.getInstance();    
    const someAddress = instance.props.onSearch(testAddress);
    expect(someAddress).toBe(testAddress);
  });
});
