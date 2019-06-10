import React from 'react';
import classes from './ToolBar.css';
import SearchBox from './SearchBox/SearchBox';
import ImportButton from './Import/ImportButton';

const toolBar = props => {
  return (
    <div className={classes.ToolBar}>
      <span className={classes.SearchIcon} />

      <SearchBox person={props.person} searchAction={props.searchAction} />
      <ImportButton />
    </div>
  );
};

export default toolBar;
