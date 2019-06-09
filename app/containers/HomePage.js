// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import Spinner from '../components/UI/Spinner/Spinner';
type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <Home />;
  }
}
