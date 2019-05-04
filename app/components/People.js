// @flow
import React, { Component } from 'react';
import photon from './photon.css';
import PeopleView from './PeopleView';
import NavBar from './NavBar';
import ToolBar from './ToolBar';
import classes from './VideoGallery.css';
import DropZone from './dropZone/dropZone';
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

        <div className={classes.VideosDiv} />

        <div className={classes.PeopleBar} />
      </div>
    );
  }
}
