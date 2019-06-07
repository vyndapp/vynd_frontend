import React from 'react';
import classes from './Spinner.css';

const spinner = props => (
  <div style={{ margin: 'auto' }}>
    <div
      className={`${classes.Loader} ${
        props.isDarkGrey ? classes.DarkGrey : null
      }`}
    >
      Loading...
    </div>
  </div>
);

export default spinner;
