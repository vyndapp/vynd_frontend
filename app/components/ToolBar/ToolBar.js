import React from 'react';
import classes from './ToolBar.css';
import SearchBox from './SearchBox/SearchBox';

const ToolBar = props => {
  return (
    <div className={classes.ToolBar}>
      <span className={classes.SearchIcon} />

      <SearchBox searchAction={props.searchAction} />

      <button className={classes.ImportButton}>
        <span className={classes.ImportIcon} /> Import
      </button>
    </div>
  );
};

export default ToolBar;
