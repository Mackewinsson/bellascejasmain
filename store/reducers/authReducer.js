import {SIGNIN_LOADING, SIGNIN_FAILED, SIGNIN, SIGNOUT, LOADING_OFF, SET_ERRORAUTH} from '../actions/auth';

const initialState = {
  user: null,
  isSignedIn: false,
  isLoading: false,
  errorAuth: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        user: action.payload.user,
        isSignedIn: true
      };
    case SIGNOUT:
      return {
        ...state,
        user: null,
        isSignedIn: false,
        isLoading: false,
      };
    case LOADING_OFF:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errorAuth: action.payload.error,
      };
    case SET_ERRORAUTH:
      return {
        ...state,
        errorAuth: action.payload,
      };
    default:
      return state;
  }
};
