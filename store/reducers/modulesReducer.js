import { GET_MODULES, LOADING_ONM, LOADING_OFFM, LOADING_DATAM, SET_ERROR } from '../actions/modules';

const initialState = {
  modules: [],
  loading: false,
  loadingData: '0',
  errorM: ""
};

export const modulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODULES:
      return {...state, modules: action.payload.slice()};
    case LOADING_ONM:
      return {...state, loading: true};
    case LOADING_OFFM:
      return {...state, loading: false};
    case SET_ERROR:
      return {...state, errorM: action.payload};
    case LOADING_DATAM:
      return {...state, loadingData: action.payload};
    default:
      return state;
  }
};
