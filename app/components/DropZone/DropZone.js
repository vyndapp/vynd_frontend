import React from 'react';
import Dropzone from 'react-dropzone';
import classes from './DropZone.css';

const dropZone = ({ children }) => (
  <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
    {({ getRootProps }) => (
      <div className={classes.Dropzone} {...getRootProps()}>
        {children}
      </div>
    )}
  </Dropzone>
);

export default dropZone;
