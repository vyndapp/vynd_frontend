import React from 'react';
import VideoThumbnail from './VideoThumbnail/VideoThumbnail';
import classes from './Videothumbnails.css';
import { ipcRenderer } from 'electron';

var videos;
ipcRenderer.on('videos:retrieved', (event, files) => {
  
  videos = [];
  files.forEach(function (file) {
    videos.push(file);
  });

  videos.shift('.DS_Store');
});

var directoryPath;
ipcRenderer.on('videos:path', (event, path) => {
  directoryPath = "" + path;
});

var framesPath;
ipcRenderer.on('frames:path', (event, path) => {
  framesPath = "" + path;
});

const videothumbnails = () => {

  var allVideos = [];
  var index = 0;
  videos.forEach(function (video) {
    var framePath = `${framesPath}/${video}/000.jpg`;
    allVideos.push(<VideoThumbnail directoryPath={directoryPath} videoName={video} placeholderImage={framePath} key={index} videoId={index} ready />)
    index++;
  });

  return (
    <ul className={classes.VideoList}>
      {allVideos}
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
    </ul>
  );
};

export default videothumbnails;
