
import { GET_QUIZES, LOADING_ONQ, LOADING_OFFQ, LOADING_DATAQ, SET_ERRORQ } from '../actions/quizes';

const initialState = {
  quizes: [],
  loading: false,
  loadingData: '0',
  errorQ: ""
};

export const quizesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUIZES:
      return {...state, quizes: action.payload.slice()};
    case LOADING_ONQ:
      return {...state, loading: true};
    case LOADING_OFFQ:
      return {...state, loading: false};
    case LOADING_DATAQ:
      return {...state, loadingData: action.payload};
    case SET_ERRORQ:
      return {...state, errorQ: action.payload};
    default:
      return state;
  }
};
