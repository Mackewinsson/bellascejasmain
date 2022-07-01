export const GET_PAYMENTS = 'GET_PAYMENTS';
export const LOADING_DATAP = 'LOADING_DATAP';
export const LOADING_ONP = 'LOADING_ONP';
export const LOADING_OFFP = 'LOADING_OFFP';
export const SET_ERRORP = 'SET_ERRORP';

import { onSnapshot, collection } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getPayment = () => async dispatch => {
  try {
    dispatch({type: LOADING_ONP});
    onSnapshot(collection(db, `Payments`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          id: el.id,
          amount: el.data().amount,
          commerceOrder: el.data().commerceOrder,
          currency: el.data().currency,
          merchantId: el.data().merchantId,
          flowOrder: el.data().flowOrder,
          payer: el.data().payer,
          paymentData: el.data().paymentData,
          requestDate: el.data().requestDate,
          requestError: el.data().requestError,
          requestStatus: el.data().requestStatus,
          subject: el.data().subject,
        });
      })
      const sortedPayments = data.sort((a, b) => b.commerceOrder.localeCompare(a.commerceOrder));
      dispatch({type: GET_PAYMENTS, payload: sortedPayments});
      dispatch({type: LOADING_OFFP});
    });
  } catch (error) {
    dispatch({type: LOADING_OFFP});
    dispatch({type: SET_ERRORP, payload: error.toString()});
  }
};

export const deleteError = () => async dispatch => {
  dispatch({type: SET_ERRORP, payload: ''});
};

export const setLoading = (loading) => async dispatch => {
  dispatch({type: LOADING_DATAP, payload: loading});
};