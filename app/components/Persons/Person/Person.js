import React, { Component } from 'react';
import classes from './Person.css';
import { Link } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';

type Props = {};

class Person extends Component<Props> {
  props: Props;
  state = {
    renaming: false
  };
  openRenaming = () => {
    event.preventDefault();
    this.setState({
      renaming: true
    });
  };
  closeRenaming = () => {
    this.setState({
      renaming: false
    });
  };
  render() {
    return (
      <li
        className={classes.Person}
        onContextMenu={this.openRenaming}
        title={this.props.personName}
      >
        <Link to="/">
          <img src="https://www.placecage.com/400/360" />
          <h5>{this.props.personName}</h5>
        </Link>
        {this.props.fullView ? (
          <Modal show={this.state.renaming} modalClosed={this.closeRenaming}>
            <Input
              intialValue={this.props.personName}
              personId={this.props.personId}
              inputClosed={this.closeRenaming}
              renameAction={this.props.renameAction}
            />
          </Modal>
        ) : null}
      </li>
    );
  }
}

export default Person;
