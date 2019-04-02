// @flow
import React, { Component } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Grid,
  Image,
  Video,
  InfiniteScroll,
  Layer,
  Text,
  ResponsiveContext,
} from 'grommet';

import { FormClose, Notification } from 'grommet-icons';
import SearchBar from 'material-ui-search-bar';
import Dropzone from 'react-dropzone';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const allItems = Array(100)
  .fill()
  .map((_, i) => `video ${i + 1}`);

class MyItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <Box pad="medium" border={{ side: "bottom" }} align="center">
        <Text>{item}</Text>
      </Box>
    );
  }
}

function filterVideos() {
  // TO DO
}

const GridInfiniteScroll = () => (
  <Box height="large" overflow="auto">
    <Grid columns="small" rows="small">
      <InfiniteScroll items={allItems}>
        {item => (
          <Box key={item} pad="xsmall">
            <Video controls="over" fit="cover">
              <source key="video" src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4" />
            </Video>
            {/* <Image src="https://via.placeholder.com/350x150" /> */}
            <Text>{item}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Grid>
  </Box>
);

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

export default class VideoGallery extends Component<Props> {
  props: Props;

  state = {
    showSidebar: false,
  }

  render() {

    const { showSidebar } = this.state;

    const style = {
      backgroundColor: 'yellow'
    };

    return (
      
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level='3' margin='none'>Vynd</Heading>
                <Button
                  icon={<Notification />}
                  onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))}
                />
              </AppBar>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                <Box flex justify='center'>
                  <SearchBar
                    onChange={() => filterVideos()}
                    onRequestSearch={() => console.log('onRequestSearch')}
                    style={{
                      margin: 10
                    }}
                  />
                  {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps({style})}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                          
                        </div>
                      </section>
                    )}

                  </Dropzone> */}
                  <GridInfiniteScroll />
               
                </Box>
                {(!showSidebar || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      flex
                      width='medium'
                      background='light-2'
                      elevation='small'
                      align='center'
                      justify='center'
                    >
                      sidebar
                      </Box>
                  </Collapsible>
                ) : (
                    <Layer>
                      <Box
                        background='light-2'
                        tag='header'
                        justify='end'
                        align='center'
                        direction='row'
                      >
                        <Button
                          icon={<FormClose />}
                          onClick={() => this.setState({ showSidebar: false })}
                        />
                      </Box>
                      <Box
                        fill
                        background='light-2'
                        align='center'
                        justify='center'
                      >
                        sidebar
                         </Box>
                    </Layer>
                  )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}