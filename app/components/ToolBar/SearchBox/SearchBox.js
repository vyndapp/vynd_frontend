import React, { Component } from 'react';
import classes from './SearchBox.css';

type Props = {};
class SearchBox extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);
  }
  state = {
    inputValue: ''
  };

  updateInputValue = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };
  handleBlur = event => {
    // put search action here
    console.log(this.state.inputValue);
  };

  render() {
    return (
      <input
        value={this.state.inputValue}
        onChange={this.updateInputValue}
        className={classes.SearchBox}
        placeholder="Search"
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default SearchBox;
