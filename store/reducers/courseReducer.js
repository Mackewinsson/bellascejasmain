import { GET_COURSES, LOADING_ONC, LOADING_OFFC, LOADING_DATAC, SET_ERRORC } from '../actions/courses';

const initialState = {
  courses: [],
  loading: false,
  loadingData: '0',
  errorC: ""
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {...state, courses: action.payload.slice()};
    case LOADING_ONC:
      return {...state, loading: true};
    case LOADING_OFFC:
      return {...state, loading: false};
    case LOADING_DATAC:
      return {...state, loadingData: action.payload};
    case SET_ERRORC:
      return {...state, errorC: action.payload};
    default:
      return state;
  }
};
