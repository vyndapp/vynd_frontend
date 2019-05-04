import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = props => (
  <li>
    <NavLink
      className={classes.NavigationItem}
      to={props.link}
      exact
      activeClassName={classes.ActiveItem}
    >
      <span className={classes[props.children]} />
      <h5>{props.children}</h5>
    </NavLink>
  </li>
);
export default navigationItem;
