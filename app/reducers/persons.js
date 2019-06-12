import * as actionTypes from '../actions/persons';

const initialState = {
  allPersonIds: [],
  personIds: [],
  loading: false
};

const person = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PERSONIDS:
      return {
        ...state,
        personIds: action.personIds,
        allPersonIds: action.personIds
      };
    case actionTypes.ADD_PERSONID:
      return {
        ...state,
        personIds: state.personIds.concat({
          personId: action.personId,
          personName: action.personName
        }),
        allPersonIds: state.allPersonIds.concat({
          personId: action.personId,
          personName: action.personName
        })
      };
    case actionTypes.RENAME_PERSON:
      return {
        ...state,
        personIds: action.newPersonIds,
        allPersonIds: action.newAllPersonIds
      };
    case actionTypes.SEARCH_PERSON_NAME:
      return {
        ...state,
        personIds: action.searchedPersonIds
      };
    case actionTypes.PERSON_LOADING:
      return {
        ...state,
        loading: action.loading
      };
  }
  return state;
};

export default person;
