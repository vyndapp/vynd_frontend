import React from 'react';
import classes from './Video.css';

const video = () => {
  return (
    <li className={classes.VideoItem}>
      {/* <img src="https://via.placeholder.com/350x150?text=VIDEO%20FILE" /> */}
      <video controls preload="metadata" width="180px" height="100px">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
    </li>
  );
};

export default video;
