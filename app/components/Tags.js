import React from 'react';
import classes from './VideoView.css';
import photon from "./photon.css";

const Tags = () => (
  <div>
    <label className={classes.Icon + " " + photon.icon + " " + photon["icon-eye"]}></label>
    <a href="#"><label className={classes.Tag}>Gasser</label></a>
    <a href="#"><label className={classes.Tag}>Hesham</label></a>
    <a href="#"><label className={classes.Tag}>Omar</label></a>
  </div>
)

export default Tags;