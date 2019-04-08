// @flow
import React, { Component } from 'react';
import People from '../components/People';

type Props = {};

export default class PeopleContainer extends Component<Props> {
  props: Props;

  render() {
    return <People />;
  }
}