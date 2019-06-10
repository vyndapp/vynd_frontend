// @flow
import React, { Component } from 'react';
import VideoView from '../components/VideoView';

type Props = {};

class VideoPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <VideoView
        videoId={this.props.match.params.videoId}
        videoExt={this.props.location.state.videoExt}
      />
    );
  }
}

export default VideoPage;
