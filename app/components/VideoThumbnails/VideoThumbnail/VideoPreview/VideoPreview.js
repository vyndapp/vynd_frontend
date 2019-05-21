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
    var link = `${this.props.directoryPath}/${this.props.videoName}`;

    return (
      <video
        ref={curRef => (this.videoRef = curRef)}
        onMouseLeave={this.pauseVideo}
        onMouseOver={this.playVideo}
        muted
      >
        {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
        <source src={link} />
      </video>
    );
  }
}

export default VideoPreview;
