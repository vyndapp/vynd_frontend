import React, { Component } from 'react';
import classes from './VideoPreview.css';

type Props = {};
class VideoPreview extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  playVideo = () => {
    if (this.videoRef.currentTime !== 0) {
      this.videoRef.currentTime = 0;
    }
    this.videoRef.play();
  };

  pauseVideo = () => {
    if (this.videoRef.currentTime !== 0) {
      this.videoRef.pause();
    }
    this.videoRef.currentTime = 0;
  };
  render() {
    return (
      <video className={classes.VideoPrev}
        ref={curRef => (this.videoRef = curRef)}
        onMouseLeave={this.pauseVideo}
        onMouseOver={this.playVideo}
        muted
      >
        <source
          src={`./Data/Videos/${this.props.videoId}/Video${
            this.props.videoExt
          }`}
        />
      </video>
    );
  }
}

export default VideoPreview;
