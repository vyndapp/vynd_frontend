// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as VideosActions from '../actions/videos';
import Layout from '../hoc/Layout/Layout';
import VideoThumbnails from '../components/VideoThumbnails/VideoThumbnails';
import People from '../components/Persons/People';

type Props = {};

class VideoGalleryContainer extends Component<Props> {
  props: Props;

  render() {
    return (
      <Layout
        person={this.props.location.state}
        searchAction={this.props.searchVideoName}
        showNavigationBar
        showToolBar
        mainSceneContent={
          <VideoThumbnails init={this.props.location.state === undefined} />
        }
        sideBarContent={<People />}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(VideosActions, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(VideoGalleryContainer);
