// @flow
import React, { Component } from 'react';
import VideoView from '../components/VideoView';

type Props = {};

export default class VideoPage extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props);
    return <VideoView videoID={this.props.match.params.videoId}/>;
  }
}