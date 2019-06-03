export const INIT_PERSONIDS = 'INIT_PERSONIDS';
export const ADD_PERSONID = 'ADD_PERSONID';

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
