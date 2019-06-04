// @flow
import React, { Component } from 'react';
import VideoGallery from '../components/VideoGallery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as VideosActions from '../actions/videos';
import * as PersonsActions from '../actions/persons';

type Props = {};

class VideoGalleryContainer extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);

    props.initVideoIds([
      '5cf51a91d7a31906f4abee00',
      '5cf51a92d7a31906f4abee01',
      '5cf51a92d7a31906f4abee02',
      '5cf51a92d7a31906f4abee03',
      '5cf51a92d7a31906f4abee04'
    ]);
    props.addVideoId('5cf51a92d7a31906f4abee05');
    props.initPersonIds([
      { personId: '5cf51a92d7a31906f4abee06', personName: 'Gasser' },
      { personId: '5cf51a92d7a31906f4abee07', personName: 'Hesham' },
      { personId: '5cf51a92d7a31906f4abee08', personName: 'Bahi' },
      { personId: '5cf51a92d7a31906f4abee09', personName: 'Omar' },
      { personId: '5cf51a92d7a31906f4abee10', personName: 'Yahya' },
      { personId: '5cf51a92d7a31906f4abee11', personName: 'Ero' }
    ]);
    props.addPersonId({
      personId: '5cf51a92d7a31906f4abee12',
      personName: 'Dummy'
    });
  }
  render() {
    return (
      <VideoGallery
        searchAction={this.props.searchVideoName}
        personIds={this.props.personIds}
        videoIds={this.props.videoIds}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    videoIds: state.videos.videoIds,
    personIds: state.persons.personIds
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...VideosActions, ...PersonsActions }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoGalleryContainer);
