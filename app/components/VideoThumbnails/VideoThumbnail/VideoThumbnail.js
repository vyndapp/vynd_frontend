import React, { Component } from 'react';
import classes from './VideoThumbnail.css';
import { Link } from 'react-router-dom';
import VideoPreview from './VideoPreview/VideoPreview';

type Props = {};
class VideoThumbnail extends Component<Props> {
  props: Props;
  state = {
    downloaded: false
  };

  download = () => {
    if (this.props.ready && this.state.downloaded === false)
      this.setState({ downloaded: true });
  };

  render() {
    let video;
    if (this.props.ready && this.state.downloaded) {
      video = (
        <Link to={`/video/${this.props.videoId}`}>
          <VideoPreview
            videoId={this.props.videoId}
            videoExt={this.props.videoExt}
          />
          <img src={`./Data/Videos/${this.props.videoId}/placeHolder.jpg`} />
        </Link>
      );
    } else {
      video = (
        <img
          className={this.props.ready ? null : classes.Loading}
          src={`./Data/Videos/${this.props.videoId}/placeHolder.jpg`}
        />
      );
    }

    return (
      <li onMouseEnter={this.download} className={classes.VideoItem}>
        {video}
      </li>
    );
  }
}

export default VideoThumbnail;
