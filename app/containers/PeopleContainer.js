// @flow
import React, { Component } from 'react';
import PeopleView from '../components/PeopleView';
import { connect } from 'react-redux';

type Props = {};

class PeopleContainer extends Component<Props> {
  props: Props;

  render() {
    return <PeopleView personIds={this.props.personIds} />;
  }
}

const mapStateToProps = state => {
  return {
    personIds: state.persons.personIds
  };
};

export default connect(mapStateToProps)(PeopleContainer);
