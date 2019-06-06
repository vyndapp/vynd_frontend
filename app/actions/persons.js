export const INIT_PERSONIDS = 'INIT_PERSONIDS';
export const ADD_PERSONID = 'ADD_PERSONID';
export const SEARCH_PERSON_NAME = 'SEARCH_PERSON_NAME';
export const RENAME_PERSON = 'RENAME_PERSON';

export const initPersonIds = personIds => {
  return {
    type: INIT_PERSONIDS,
    personIds
  };
};

export const addPersonId = ({ personId, personName }) => {
  return {
    type: ADD_PERSONID,
    personId,
    personName
  };
};

export const renamePerson = ({ personId, newPersonName }) => {
  return (dispatch, getState) => {
    const newAllPersonIds = getState().persons.allPersonIds.map(person => {
      if (person.personId === personId) {
        return { personId: personId, personName: newPersonName };
      } else {
        return { ...person };
      }
    });
    const newPersonIds = getState().persons.personIds.map(person => {
      if (person.personId === personId) {
        return { personId: personId, personName: newPersonName };
      } else {
        return { ...person };
      }
    });
    dispatch({ type: RENAME_PERSON, newPersonIds, newAllPersonIds });
  };
};

export const searchPersonName = personName => {
  return (dispatch, getState) => {
    let newPersonIds = getState().persons.allPersonIds.concat();
    newPersonIds = newPersonIds.filter(person =>
      person.personName.toUpperCase().startsWith(personName.toUpperCase())
    );
    dispatch({ type: SEARCH_PERSON_NAME, searchedPersonIds: newPersonIds });
  };
};
