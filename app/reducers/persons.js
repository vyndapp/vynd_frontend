import * as actionTypes from '../actions/persons';

const initialState = {
  personIds: []
};

const person = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PERSONIDS:
      return {
        ...state,
        personIds: action.personIds
      };
    case actionTypes.ADD_PERSONID:
      return {
        ...state,
        personIds: state.personIds.concat({
          personId: action.personId,
          personName: action.personName
        })
      };
  }
  return state;
};

export default person;
