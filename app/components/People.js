// @flow
import React, { Component } from 'react';
import photon from './photon.css';
import PeopleView from './PeopleView';
import NavBar from './NavBar';
import ToolBar from './ToolBar';
import Videos from './Videos/Videos';
import classes from './VideoGallery.css';
import DropZone from './dropZone/dropZone';

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
        </div>

        <div className={classes.PeopleBar}>
        </div>
      </div>
    );
  }
}