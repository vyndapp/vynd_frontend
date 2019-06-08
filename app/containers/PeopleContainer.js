// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PersonsActions from '../actions/persons';
import { bindActionCreators } from 'redux';
import Layout from '../hoc/Layout/Layout';
import Persons from '../components/Persons/Persons';

type Props = {};

class PeopleContainer extends Component<Props> {
  props: Props;

  render() {
    return (
      <Layout
        showNavigationBar
        showToolBar
        searchAction={this.props.searchAction}
        mainSceneContent={<Persons fullView />}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(PersonsActions, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(PeopleContainer);
