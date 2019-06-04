import React from 'react';
import Persons from './Persons';
import Title from '../Title/Title';

const People = props => {
  return (
    <React.Fragment>
      <Title>People</Title>
      <Persons personIds={props.personIds} />
    </React.Fragment>
  );
};

export default People;
