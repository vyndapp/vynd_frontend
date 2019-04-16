import React from 'react';
import VideoThumbnail from './VideoThumbnail/VideoThumbnail';
import classes from './Videothumbnails.css';

const videothumbnails = () => {
  const allItems = Array(20)
    .fill()
    .map((_, i) => <VideoThumbnail key={i} videoId={i} ready />);
  return (
    <ul className={classes.VideoList}>
      {allItems}
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
    </ul>
  );
};

export default videothumbnails;
