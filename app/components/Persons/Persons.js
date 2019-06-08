import React, { Component } from 'react';
import Person from './Person/Person';
import classes from './Persons.css';
import * as PersonsActions from '../../actions/persons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from '../../axios';
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
    const res = await axios.get('/personIds.json');

    const arr = [];
    for (let i = 0; i < res.data.length; i++) {
      let str = res.data[i];
      str = str.replace(/\'/g, '"');
      const parsed = JSON.parse(str);
      arr.push(parsed);
    }
    this.props.initPersonIds(arr);
    this.setState({
      loading: false
    });
  }
  render() {
    console.log(this.state.loading);
    const allItems = this.props.personIds.map((person, i) => (
      <Person
        fullView={this.props.fullView}
        key={person.personId}
        personId={person.personId}
        personName={person.personName}
        renameAction={this.props.renameAction}
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
