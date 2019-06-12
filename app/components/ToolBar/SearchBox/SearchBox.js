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
    this.props.searchAction({ name: this.state.inputValue });
  };

  componentDidMount() {
    if (this.props.person !== undefined) {
      // we need to change this.props.person.personName to personId
      this.props.person.personId !== undefined
        ? this.props.searchAction({ face_id: this.props.person.personId })
        : this.props.searchAction({ name: this.props.person.personName });

      this.setState({
        inputValue: this.props.person.personName
      });
    } else {
      this.props.searchAction({ name: '' });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.person !== prevProps.person) {
      // we need to change this.props.person.personName to personId
      this.props.person.personId !== undefined
        ? this.props.searchAction({ face_id: this.props.person.personId })
        : this.props.searchAction({ name: this.props.person.personName });

      this.setState({
        inputValue: this.props.person.personName
      });
    }
  }
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
