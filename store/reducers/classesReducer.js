import { GET_CLASSES, LOADING_ONCL, LOADING_OFFCL, LOADING_DATACL, SET_ERRORCL } from '../actions/classes';

const initialState = {
  classes: [],
  loading: false,
  loadingData: '0',
  errorCL: ""
};

export const classesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSES:
      return {...state, classes: action.payload.slice()};
    case LOADING_ONCL:
      return {...state, loading: true};
    case LOADING_OFFCL:
      return {...state, loading: false};
    case LOADING_DATACL:
      return {...state, loadingData: action.payload};
    case SET_ERRORCL:
      return {...state, errorCL: action.payload};
    default:
      return state;
  }
};
