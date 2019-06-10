// @flow
import * as React from 'react';
import { ipcRenderer } from 'electron';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as VideosActions from '../actions/videos';

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    ipcRenderer.on('videos:retrieved', (event, videoIdAndExt) => {
      console.log('call redux for addVideoId');
      this.props.addVideoId({
        videoId: videoIdAndExt[0],
        videoExt: videoIdAndExt[1]
      });
    });
  }
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(VideosActions, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(App);
