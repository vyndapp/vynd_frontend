import React from 'react';
import classes from './Person.css';
import { Link } from 'react-router-dom';

const Person = props => {
  return (
    <li className={classes.Person}>
      <Link to="/">
        <img src="https://www.placecage.com/400/360" />
        <h5>{props.personName}</h5>
      </Link>
    </li>
  );
};

export default Person;
