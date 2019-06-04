import React from 'react';

import NavigationBar from '../../components/Navigation/NavigationBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import classes from './Layout.css';

const Layout = props => {
  return (
    <div className={classes.Container}>
      <div className={classes.NavBar}>
        {props.showNavigationBar ? <NavigationBar /> : null}
      </div>

      <div className={classes.ToolBar}>
        {props.showToolBar ? <ToolBar /> : null}
      </div>

      <div className={classes.mainView}>{props.mainSceneContent}</div>

      <div className={classes.sideBar}>{props.sideBarContent}</div>
    </div>
  );
};

export default Layout;
