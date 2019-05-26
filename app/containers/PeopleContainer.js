// @flow
import React, { Component } from 'react';
import PeopleView from '../components/PeopleView';

type Props = {};

export default class PeopleContainer extends Component<Props> {
  props: Props;

  render() {
    return <PeopleView />;
  }
}
