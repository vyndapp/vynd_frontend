import React from 'react';
import Video from './Video/Video';
import classes from './Videos.css';

/*
ToDo:
*drop zone
*routing & link
*preview
*preprocessing fade cann't point to it
*lazy loading
*some styling to make the image look like video ex: play icon
*/
const videos = () => {
  const allItems = Array(100)
    .fill()
    .map((_, i) => <Video key={i}/>);
  return (
  <ul className={classes.VideoList}>
    { allItems }
    <li className={classes.PlaceHolder}></li>
    <li className={classes.PlaceHolder}></li>
    <li className={classes.PlaceHolder}></li>
  </ul>);
};

export default videos;
