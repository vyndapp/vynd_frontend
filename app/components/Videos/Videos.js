import React from 'react';
import Video from './Video/Video';
import classes from './Videos.css';

const videos = () => {
  const allItems = Array(99)
    .fill()
    .map((_, i) => <Video key={i} videoId={i} />);
  return (
    <ul className={classes.VideoList}>
      {allItems}
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
    </ul>
  );
};

export default videos;
