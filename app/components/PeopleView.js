// @flow
import React from 'react';
import Persons from './Persons/Persons';
import Layout from '../hoc/Layout/Layout';

const PeopleView = props => {
  return (
    <Layout
      showNavigationBar
      showToolBar
      mainSceneContent={<Persons personIds={props.personIds} />}
    />
  );
};
export default PeopleView;
