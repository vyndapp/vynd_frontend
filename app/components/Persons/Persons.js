import React, { Component } from 'react';
import Person from './Person/Person';
import classes from './Persons.css';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';

type Props = {};

class Persons extends Component<Props> {
  props: Props;
  render() {
    const sideView = this.props.fullView ? false : true;
    const allItems = this.props.personIds.map(person => {
      if (this.props.fullView || (sideView && person.personName !== ''))
        return (
          <Person
            fullView={this.props.fullView}
            key={person.personId}
            personId={person.personId}
            personName={person.personName}
            personImage={person.personImage}
            renameAction={this.props.renamePerson}
          />
        );
    });
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
    return this.props.loading ? (
      <Spinner isDarkGrey={!this.props.fullView} />
    ) : (
      normalView
    );
  }
}

const mapStateToProps = state => {
  return {
    personIds: state.persons.personIds,
    loading: state.persons.loading
  };
};

export default connect(mapStateToProps)(Persons);
