// @flow
import React, { Component } from 'react';

type Props = {};

export default class VideoPage extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props);
    return <p>Hello World!! {this.props.match.params.videoId}</p>;
  }
}
