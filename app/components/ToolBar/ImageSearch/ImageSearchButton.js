import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import classes from './ImageSearchButton.css';
import axios from '../../../axios';
import { withRouter } from 'react-router-dom';
import routes from '../../../constants/routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PersonsActions from '../../../actions/persons';

const ACCEPTED_FILETYPE = 'image';

type Props = {};

class ImageSearchButton extends Component<Props> {
  props: Props;

  importFile = event => {
    const files = event.target.files;
    this.encodeImageFileAsURL(files[0]);
  };

  encodeImageFileAsURL = file => {
    var reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',').pop();
      this.sendImage(base64);
    };
    reader.readAsDataURL(file);
  };

  sendImage = async base64Image => {
    this.props.getFacesFromImage(base64Image);
    this.props.history.push(routes.PEOPLE);
  };

  render() {
    return (
      <React.Fragment>
        <input
          className={classes.CustomFileInput}
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={this.importFile}
        />

        <label className={classes.ImageSearchButton} htmlFor="fileInput">
          <span className={classes.ImageSearchIcon} />
        </label>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(PersonsActions, dispatch);
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ImageSearchButton)
);
