import React from 'react';
import VideoThumbnail from './VideoThumbnail/VideoThumbnail';
import classes from './Videothumbnails.css';

const videothumbnails = props => {
  const allItems = props.videoIds.map((videoId, i) => (
    <VideoThumbnail key={videoId} videoId={videoId} ready />
  ));
  return (
    <ul className={classes.VideoList}>
      {allItems}
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
    </ul>
  );
};

export default videothumbnails;
