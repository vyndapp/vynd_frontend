import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import VideoThumbnails from './VideoThumbnails/VideoThumbnails';
import NavigationBar from './Navigation/NavigationBar';
import ToolBar from './ToolBar/ToolBar';
import classes from './VideoView.css';
import Title from './Title/Title';
import Tags from './Tags';

export default class VideoView extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.NavBar}>
          <NavigationBar />
        </div>

        <div className={classes.ToolBar}>
          <ToolBar />
        </div>

        <div className={classes.VideoDiv}>
          <img width="95%" src="https://via.placeholder.com/600x360" />
          <Tags />
          <h5>Video ID:{this.props.videoID}</h5>
        </div>

        <div className={classes.VideosBar}>
          <Title>Related Videos</Title>
          <VideoThumbnails videoIds={this.props.videoIds} />
        </div>
      </div>
    );
  }
}
