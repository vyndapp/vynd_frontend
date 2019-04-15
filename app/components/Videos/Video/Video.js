import React from 'react';
import classes from './Video.css';
import { Link } from 'react-router-dom';

const video = props => {
  return (
    <Link to={`/video/${props.videoId}`}>
      <li className={classes.VideoItem}>
        <img src="https://via.placeholder.com/350x150?text=VIDEO%20FILE" />
      </li>
    </Link>
  );
};

export default video;
