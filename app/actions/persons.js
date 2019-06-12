import axios from '../axios';

export const INIT_PERSONIDS = 'INIT_PERSONIDS';
export const ADD_PERSONID = 'ADD_PERSONID';
export const SEARCH_PERSON_NAME = 'SEARCH_PERSON_NAME';
export const RENAME_PERSON = 'RENAME_PERSON';
export const PERSON_LOADING = 'PERSON_LOADING';
export const GET_FACES_FROM_IMG = 'GET_FACES_FROM_IMG';
export const PUT_PERSONS = 'PUT_PERSONS';

export const initPersonIds = () => {
  return async dispatch => {
    dispatch({ type: PERSON_LOADING, loading: true });
    const res = await axios.get('/api/get-faces');
    const personIds = res.data.faces.map(person => {
      return {
        personId: person._id,
        personName: person.name === null ? '' : person.name,
        personImage: person.face_image
      };
    });
    dispatch({ type: INIT_PERSONIDS, personIds });
    dispatch({ type: PERSON_LOADING, loading: false });

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

const isStringInArry = (str, arr) => {
  if (arr.indexOf(str) === -1) {
    return false;
  } else {
    return true;
  }
};

export const getFacesFromImage = base64Image => {
  return async (dispatch, getState) => {
    dispatch({ type: PERSON_LOADING, loading: true });
    try {
      const res = await axios({
        method: 'post',
        url: '/api/get-faces-in-image',
        data: {
          image: base64Image
        }
      });
      const newPersonIds = getState().persons.allPersonIds.filter(person =>
        isStringInArry(person.personId, res.data.faces_ids)
      );
      dispatch({ type: PUT_PERSONS, newPersonIds });
    } catch (err) {
      console.log('Fail');
      console.log(err);
    }

    dispatch({ type: PERSON_LOADING, loading: false });
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

export const searchPersonName = ({ name }) => {
  return (dispatch, getState) => {
    let newPersonIds = getState().persons.allPersonIds.concat();
    newPersonIds = newPersonIds.filter(person =>
      person.personName.toUpperCase().startsWith(name.toUpperCase())
    );
    dispatch({ type: SEARCH_PERSON_NAME, searchedPersonIds: newPersonIds });
  };
};
