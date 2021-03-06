import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import VideoThumbnails from './VideoThumbnails/VideoThumbnails';
import NavigationBar from './Navigation/NavigationBar';
import ToolBar from './ToolBar/ToolBar';
import classes from './VideoView.css';
import Title from './Title/Title';
import Tags from './Tags';
import { Player, BigPlayButton } from 'video-react';

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
         <Player fluid={false} width="96%" height="71%"
            src={`./Data/Videos/${this.props.videoId}/Video${
              this.props.videoExt
            }`}
          >
            <BigPlayButton position="center" />
          </Player>

          <Tags />
          <h5>ID:{this.props.videoId}</h5>
        </div>

        <div className={classes.VideosBar}>
          <Title>Related Videos</Title>
          <VideoThumbnails videoIds={this.props.videoIds} />
        </div>
      </div>
    );
  }
}
