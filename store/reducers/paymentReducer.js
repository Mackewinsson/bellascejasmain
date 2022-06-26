
import { GET_PAYMENTS, LOADING_ONP, LOADING_OFFP, LOADING_DATAP, SET_ERRORP } from '../actions/payment';

const initialState = {
  payments: [],
  loading: false,
  loadingData: '0',
  errorP: ""
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENTS:
      return {...state, payments: action.payload.slice()};
    case LOADING_ONP:
      return {...state, loading: true};
    case LOADING_OFFP:
      return {...state, loading: false};
    case LOADING_DATAP:
      return {...state, loadingData: action.payload};
    case SET_ERRORP:
      return {...state, errorP: action.payload};
    default:
      return state;
  }
};
