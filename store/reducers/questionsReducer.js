
import { GET_QUESTIONS, LOADING_ONQE, LOADING_OFFQE, LOADING_DATAQE, SET_ERRORQE } from '../actions/questions';

const initialState = {
  questions: [],
  loading: false,
  loadingData: '0',
  errorQE: ""
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {...state, questions: action.payload.slice()};
    case LOADING_ONQE:
      return {...state, loading: true};
    case LOADING_OFFQE:
      return {...state, loading: false};
    case LOADING_DATAQE:
      return {...state, loadingData: action.payload};
    case SET_ERRORQE:
      return {...state, errorQE: action.payload};
    default:
      return state;
  }
};
