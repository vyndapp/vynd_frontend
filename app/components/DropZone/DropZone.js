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

    ipcRenderer.send('videos:added', videos);
  
  }}>
    {({ getRootProps }) => (
      <div className={classes.Dropzone} {...getRootProps()}>
        {children}
      </div>
    )}
  </Dropzone>
);

export default dropZone;