import React from 'react';
import { ipcRenderer } from 'electron';
import classes from './ImportButton.css';

const ACCEPTED_FILETYPE = 'video';

const importFiles = event => {
  const files = event.target.files;
  const videos = fileListToArray(files);
  console.log(videos);
  ipcRenderer.send('videos:added', videos);
};

const fileListToArray = files => {
  const acceptedFiles = _.filter(files, file =>
    file.type.startsWith(ACCEPTED_FILETYPE)
  );
  const array = _.map(acceptedFiles, ({ name, path, size, type }) => {
    if (type) return { name, path, size, type };
  });
  return array;
};

const importButton = props => {
  return (
    <React.Fragment>
      <input
        className={classes.CustomFileInput}
        id="videoInput"
        type="file"
        accept="video/*"
        multiple
        onChange={importFiles}
      />

      <label className={classes.ImportButton} htmlFor="videoInput">
        <span className={classes.ImportIcon} /> Import
      </label>
    </React.Fragment>
  );
};

export default importButton;
