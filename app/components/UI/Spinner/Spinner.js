import React from 'react';
import classes from './Spinner.css';

const spinner = props => (
  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
    <div style={{ margin: 'auto' }}>
      <div
        className={`${classes.Loader} ${
          props.isDarkGrey ? classes.DarkGrey : null
        }`}
      >
        Loading...
      </div>
    </div>
  </div>
);

export default spinner;
