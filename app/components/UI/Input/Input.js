import React, { Component } from 'react';
import classes from './Input.css';

type Props = {};
class Input extends Component<Props> {
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
    this.props.inputClosed();
    this.props.renameAction({
      personId: this.props.personId,
      newPersonName: this.state.inputValue
    });
    // this.personID change to this.state.inputValue
  };

  render() {
    return (
      <input
        value={this.state.inputValue}
        onChange={this.updateInputValue}
        className={classes.Input}
        placeholder={this.props.placeHolder}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default Input;
