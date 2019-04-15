// @flow
import React, { Component } from 'react';
import photon from './photon.css';
import PeopleView from './PeopleView';
import NavBar from './NavBar';
import ToolBar from './ToolBar';
import VideoThumbnails from './VideoThumbnails/VideoThumbnails';
import classes from './VideoGallery.css';
import DropZone from './DropZone/DropZone';

export default class VideoGallery extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.NavBar}>
          <NavBar />
        </div>

        <div className={classes.ToolBar}>
          <ToolBar />
        </div>

        <div className={classes.VideosDiv}>
          <DropZone>
            <VideoThumbnails />
          </DropZone>
        </div>

        <div className={classes.PeopleBar}>
          <PeopleView />
        </div>
      </div>
    );
  }
}
