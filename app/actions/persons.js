import axios from '../axios';

export const INIT_PERSONIDS = 'INIT_PERSONIDS';
export const ADD_PERSONID = 'ADD_PERSONID';
export const SEARCH_PERSON_NAME = 'SEARCH_PERSON_NAME';
export const RENAME_PERSON = 'RENAME_PERSON';

export const initPersonIds = () => {
  return async dispatch => {
    const res = await axios.get('/api/get-faces');
    const personIds = res.data.faces.map(person => {
      return {
        personId: person._id,
        personName: person.name === null ? '' : person.name,
        personImage: person.face_image
      };
    });
    dispatch({ type: INIT_PERSONIDS, personIds });

    // const res = await axios.get(
    //   'https://vynd-5222f.firebaseio.com/personIds.json'
    // );
    // const personIds = [];
    // for (let i = 0; i < res.data.length; i++) {
    //   let str = res.data[i];
    //   str = str.replace(/\'/g, '"');
    //   const parsed = JSON.parse(str);
    //   personIds.push(parsed);
    // }
    // dispatch({ type: INIT_PERSONIDS, personIds });
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
        axios.post('/api/update-face', {
          face_id: person.personId,
          name: newPersonName
        });
        return { ...person, personName: newPersonName };
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
