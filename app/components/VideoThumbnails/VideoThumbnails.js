import React, { Component } from 'react';
import VideoThumbnail from './VideoThumbnail/VideoThumbnail';
import classes from './Videothumbnails.css';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import DropZone from '../DropZone/DropZone';

type Props = {};

class VideoThumbnails extends Component<Props> {
  props: Props;

  render() {
    const allItems = this.props.videoIds.map((video, i) => (
      <VideoThumbnail
        key={video.videoId}
        videoId={video.videoId}
        videoExt={video.videoExt}
        ready
      />
    ));
    const normalView = (
      <DropZone>
        <ul className={classes.VideoList}>
          {allItems}
          <li className={classes.PlaceHolder} />
          <li className={classes.PlaceHolder} />
          <li className={classes.PlaceHolder} />
          <li className={classes.PlaceHolder} />
        </ul>
      </DropZone>
    );
    return this.props.loading ? <Spinner /> : normalView;
  }
}

const mapStateToProps = state => {
  return {
    videoIds: state.videos.videoIds,
    loading: state.videos.loading
  };
};

export default connect(mapStateToProps)(VideoThumbnails);
