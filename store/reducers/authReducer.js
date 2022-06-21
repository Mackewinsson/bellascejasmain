import {SIGNIN_LOADING, SIGNIN_FAILED, SIGNIN, SIGNOUT} from '../actions/auth';

const initialState = {
  user: null,
  isSignedIn: false,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        user: action.payload.user,
        isSignedIn: true,
        isLoading: false,
      };
    case SIGNOUT:
      return {
        ...state,
        user: null,
        isSignedIn: false,
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
        error: action.payload.error,
      };
    default:
      return state;
  }
};
