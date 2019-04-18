import _ from 'lodash';
import React from 'react';
import Dropzone from 'react-dropzone';
import classes from './DropZone.css';
import { ipcRenderer } from 'electron';

const dropZone = ({ children }) => (

  <Dropzone onDrop={files => {
    const videos = _.map(files, ({ name, path, size, type }) => {
      return { name, path, size, type };
    });
    
    // react-dropzone version error handler. (To be removed)
    if(videos[0].name === videos[0].path ) {
      let errMessage = "Please uninstall react-dropzone and npm install --save react-dropzone@8.0.0";
      ipcRenderer.send('videos:error', errMessage)
    } else {
      ipcRenderer.send('videos:added', videos);
    }
  
  }}>
    {({ getRootProps }) => (
      <div className={classes.Dropzone} {...getRootProps()}>
        {children}
      </div>
    )}
  </Dropzone>
);

export default dropZone;