// @flow
import React, { Component } from 'react';
import photon from './photon.css';
import ToolBar from './ToolBar/ToolBar';
import VideoThumbnails from './VideoThumbnails/VideoThumbnails';
import classes from './VideoGallery.css';
import DropZone from './DropZone/DropZone';
import Persons from './Persons/Persons';
import Title from './Title/Title';
import NavigationBar from './Navigation/NavigationBar';

export default class VideoGallery extends Component<Props> {
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

        <div className={classes.VideosDiv}>
          <DropZone>
            <VideoThumbnails videoIds={this.props.videoIds} />
          </DropZone>
        </div>

        <div className={classes.PeopleBar}>
          <Title>People</Title>
          <Persons personIds={this.props.personIds} />
        </div>
      </div>
    );
  }
}
