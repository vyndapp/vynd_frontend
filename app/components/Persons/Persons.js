import React from 'react';
import Person from './Person/Person';
import classes from './Persons.css';

const Persons = props => {
  const allItems = props.personIds.map((person, i) => (
    <Person
      fullView={props.fullView}
      key={person.personId}
      personId={person.personId}
      personName={person.personName}
      renameAction={props.renameAction}
    />
  ));
  return (
    <ul className={classes.PersonsList}>
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
    </ul>
  );
};

export default Persons;
