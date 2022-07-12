import {CREATE_USER, GET_ALL_USER, GET_USER, SIGNOUT, LOADING_ONU, LOADING_OFFU, SET_ERRORU, LOADING_DATAU } from '../actions/user';

const initialState = {
  user: {},
  users: [],
  loading: false,
  loadingData: "0",
  errorU: ""
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
    case GET_ALL_USER:
      return {...state, users: action.payload.slice()};
      case LOADING_ONU:
        return {...state, loading: true};
      case LOADING_OFFU:
        return {...state, loading: false};
      case LOADING_DATAU:
        return {...state, loadingData: action.payload};
      case SET_ERRORU:
        return {...state, errorU: action.payload};
    default:
      return state;
  }
};
