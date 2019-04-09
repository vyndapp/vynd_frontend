// @flow
import React, { Component } from "react";
import photon from "./photon.css";

const toolbarStyle = {
  top: 0,
  position: "sticky"
};

const searchInputStyle = {
  color: "white",
  maxWidth: 200,
  minHeight: 27,
  height: 27,
  boxShadow: "0px 0px 0px",
  backgroundColor: "#fff0",
  border: "none",
  borderBottom: "1px solid #e2e2e2",
  borderRadius: 0,
  fontSize: "15px"
};

const searchIconStyle = {
  paddingLeft: "5px",
  borderBottom: "1px solid #E2E2E2",
  paddingTop: "4px",
  paddingBottom: "2px",
  marginLeft: "5px"
};

export default class ToolBar extends Component<Props> {
  props: Props;

  render() {
    return (
      <header
        className={photon.toolbar + " " + photon["toolbar-header"]}
        style={toolbarStyle}
      >
        <h1 className={photon.title}> </h1>

        <div className={photon["toolbar-actions"]}>
          <span>
            <span
              className={
                photon.icon +
                " " +
                photon["icon-search"] +
                " " +
                photon["pull-left"]
              }
              style={searchIconStyle}
            />
            <input
              className={photon["form-control"] + " " + photon["pull-left"]}
              type="search"
              placeholder="Search"
              style={searchInputStyle}
            />
          </span>

          <button
            className={
              photon.btn +
              " " +
              photon["btn-default"] +
              " " +
              photon["pull-right"]
            }
          >
            <span
              className={
                photon.icon +
                " " +
                photon["icon-download"] +
                " " +
                photon["icon-text"]
              }
            />
            Import
          </button>
        </div>
      </header>
    );
  }
}