// @flow
import React, { Component } from "react";
import photon from "./photon.css";
import NavBar from "./NavBar";
import ToolBar from "./ToolBar";
import GridInfiniteScroll from "./GridInfiniteScroll";
import { Grommet } from "grommet";
import { isAbsolute } from "upath";

export default class VideoGallery extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={photon.window}>
        <div className={photon["window-content"]}>
          <div className={photon["pane-group"]}>
            <div className={photon["pane-sm"] + " " + photon.sidebar}>
              <NavBar />
            </div>
            <div className={photon.pane}>
              <ToolBar />
              <h1>This is the People page</h1>
            </div>
            <div className={photon["pane-sm"] + " " + photon.sidebar}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}