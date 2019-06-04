// @flow
import React from 'react';
import VideoThumbnails from './VideoThumbnails/VideoThumbnails';
import DropZone from './DropZone/DropZone';
import People from './Persons/People';
import Layout from '../hoc/Layout/layout';

const VideoGallery = props => {
  return (
    <Layout
      searchAction={props.searchAction}
      showNavigationBar
      showToolBar
      mainSceneContent={
        <DropZone>
          <VideoThumbnails videoIds={props.videoIds} />
        </DropZone>
      }
      sideBarContent={<People personIds={props.personIds} />}
    />
  );
};

export default VideoGallery;
