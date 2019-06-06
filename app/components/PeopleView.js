// @flow
import React from 'react';
import Persons from './Persons/Persons';
import Layout from '../hoc/Layout/Layout';

const PeopleView = props => {
  return (
    <Layout
      searchAction={props.searchAction}
      showNavigationBar
      showToolBar
      mainSceneContent={
        <Persons
          fullView
          personIds={props.personIds}
          renameAction={props.renameAction}
        />
      }
    />
  );
};
export default PeopleView;
