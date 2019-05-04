import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import routes from '../../../constants/routes';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={routes.GALLERY}>Home</NavigationItem>
    <NavigationItem link={routes.COUNTER}>Videos</NavigationItem>
    <NavigationItem link={routes.PEOPLE}>People</NavigationItem>
  </ul>
);
export default navigationItems;
