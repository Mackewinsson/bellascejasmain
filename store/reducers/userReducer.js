import {CREATE_USER, GET_USER, SIGNOUT } from '../actions/user';

const initialState = {
  user: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {...state};
      case SIGNOUT:
        return {
          ...state,
          user: null,
        };
    case GET_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
