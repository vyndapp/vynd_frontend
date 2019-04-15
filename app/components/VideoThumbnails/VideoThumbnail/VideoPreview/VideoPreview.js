import React from 'react';
import classes from './VideoPreview.css';
let refs;

const playVideo = () => {
  refs.play();
};

const pauseVideo = () => {
  refs.pause();
  refs.currentTime = 0;
};

const videoPreview = () => {
  return (
    <video
      ref={ref => (refs = ref)}
      onMouseLeave={pauseVideo}
      onMouseOver={playVideo}
      muted
    >
      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    </video>
  );
};

export default videoPreview;
