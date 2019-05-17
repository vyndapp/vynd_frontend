import React from 'react';
import Person from './Person/Person';
import classes from './Persons.css';

const Persons = () => {
  const allItems = Array(32)
    .fill()
    .map((_, i) => (
      <Person key={i} personId={i} personName={'Nicholas Cage'} />
    ));
  return <ul className={classes.PersonsList}>
  {allItems}
  <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
      <li className={classes.PlaceHolder} />
  </ul>;
};

export default Persons;
