import React from 'react';
import classes from './ToolBar.css';

const ToolBar = props => {
  return (
    <div className={classes.ToolBar}>
      <span className={classes.SearchIcon} />

      <input className={classes.SearchBox} placeholder="Search" />

      <button className={classes.ImportButton}>
        <span className={classes.ImportIcon} /> Import
      </button>
    </div>
  );
};

export default ToolBar;
