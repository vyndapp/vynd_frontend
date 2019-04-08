import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import VideoGalleryContainer from './containers/VideoGalleryContainer';
import PeopleContainer from './containers/PeopleContainer';
import VideoPage from './containers/VideoPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.Video} component={VideoPage}/>
      <Route path={routes.GALLERY} component={VideoGalleryContainer} />
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.PEOPLE} component={PeopleContainer} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
