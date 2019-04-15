// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import photon from "./photon.css";

export default class NavBar extends Component<Props> {
  props: Props;

  render() {
    return (
      <nav className={photon["nav-group"]}>
      <h5 className={photon["nav-group-title"]}>ⓥ Vynd</h5>
      <Link to={routes.GALLERY}>
      <span className={photon["nav-group-item"] + " " + photon.active}>
        <span className={photon.icon + " " + photon["icon-home"]} />
        Home
      </span>
      </Link>

      <Link to={routes.COUNTER}>
      <span className={photon["nav-group-item"]}>
        <span className={photon.icon + " " + photon["icon-video"]} />
        Videos
      </span>
      </Link>
      
      <Link to={routes.PEOPLE}>
      <span className={photon["nav-group-item"]}>
        <span className={photon.icon + " " + photon["icon-users"]} />
        People
      </span>
      </Link>
      
    </nav>
    );
  }
}