import React, { Component } from 'react';
import VideoThumbnail from './VideoThumbnail/VideoThumbnail';
import classes from './Videothumbnails.css';
import * as VideosActions from '../../actions/videos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import DropZone from '../DropZone/DropZone';

type Props = {};

class VideoThumbnails extends Component<Props> {
  props: Props;
  state = {
    loading: true
  };

  async componentDidMount() {
    if (this.props.init) {
      this.setState({
        loading: true
      });
      await this.props.initVideoIds();
      this.setState({
        loading: false
      });
    }
    this.setState({
      loading: false
    });
  }

  render() {
    const allItems = this.props.videoIds.map((videoId, i) => (
      <VideoThumbnail key={videoId} videoId={videoId} ready />
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
    return this.state.loading ? <Spinner /> : normalView;
  }
}

const mapStateToProps = state => {
  return {
    videoIds: state.videos.videoIds
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(VideosActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoThumbnails);
