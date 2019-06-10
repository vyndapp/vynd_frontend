import React, { Component } from 'react';
import Person from './Person/Person';
import classes from './Persons.css';
import * as PersonsActions from '../../actions/persons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';

type Props = {};

class Persons extends Component<Props> {
  props: Props;
  state = {
    loading: true
  };
  async componentDidMount() {
    this.setState({
      loading: true
    });

    this.props.initPersonIds();
    this.setState({
      loading: false
    });
  }
  render() {
    const allItems = this.props.personIds.map(person => (
      <Person
        fullView={this.props.fullView}
        key={person.personId}
        personId={person.personId}
        personName={person.personName}
        renameAction={this.props.renamePerson}
      />
    ));
    const normalView = (
      <ul className={classes.PersonsList}>
        {allItems}
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
        <li className={classes.PlaceHolder} />
      </ul>
    );
    return this.state.loading ? (
      <Spinner isDarkGrey={!this.props.fullView} />
    ) : (
      normalView
    );
  }
}

const mapStateToProps = state => {
  return {
    personIds: state.persons.personIds
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(PersonsActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Persons);
