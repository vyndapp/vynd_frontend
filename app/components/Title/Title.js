import React from 'react';
import classes from './Title.css';

const Title = props => {
  return <h5 className={classes.Title}>{props.children}</h5>;
};

export default Title;
