// @flow
import React, { Component } from 'react';
import photon from './photon.css';
import ToolBar from './ToolBar/ToolBar';
import classes from './VideoGallery.css';
import DropZone from './dropZone/dropZone';
import NavigationBar from './Navigation/NavigationBar';
import Persons from './Persons/Persons';

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
          <Persons />
        </div>

        <div className={classes.PeopleBar} />
      </div>
    );
  }
}
