// @flow
import React, { Component } from 'react';
import VideoView from '../components/VideoView';
import { connect } from 'react-redux';

type Props = {};

class VideoPage extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props);
    return (
      <VideoView
        videoIds={this.props.videoIds}
        videoID={this.props.match.params.videoId}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    videoIds: state.videos.videoIds
  };
};

export default connect(mapStateToProps)(VideoPage);
