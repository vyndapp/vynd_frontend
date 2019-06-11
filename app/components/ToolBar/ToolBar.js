import React from 'react';
import classes from './ToolBar.css';
import SearchBox from './SearchBox/SearchBox';
import ImportButton from './Import/ImportButton';
import ImageSearchButton from './ImageSearch/ImageSearchButton';

const toolBar = props => {
  return (
    <div className={classes.ToolBar}>
      <span className={classes.SearchIcon} />

      <SearchBox person={props.person} searchAction={props.searchAction} />
      <ImageSearchButton />
      <ImportButton />
    </div>
  );
};

export default toolBar;
