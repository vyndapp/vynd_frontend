import React from 'react';
import { ipcRenderer } from 'electron';
import classes from './ImageSearchButton.css';
import axios from '../../../axios';

const ACCEPTED_FILETYPE = 'image';

const importFile = event => {
    const files = event.target.files;
    encodeImageFileAsURL(files[0]);
};

function encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function() {
        const base64 = reader.result.split (",").pop();
        sendImage(base64);
    }
    reader.readAsDataURL(file);
}

async function sendImage(base64Image) {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/get-faces-in-image',
            data: {
                image: base64Image
            }
        });
        console.log(response);
    } catch(err) {
        console.log(err);
    }
}

const imageSearchButton = props => {
  return (
    <React.Fragment>
      <input
        className={classes.CustomFileInput}
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={importFile}
      />

      <label className={classes.ImageSearchButton} htmlFor="fileInput">
        <span className={classes.ImageSearchIcon} />
      </label>
    </React.Fragment>
  );
};

export default imageSearchButton;