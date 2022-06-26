export const GET_QUESTIONS = 'GET_QUESTIONS';
export const LOADING_DATAQE = 'LOADING_DATAQE';
export const LOADING_ONQE = 'LOADING_ONQE';
export const LOADING_OFFQE = 'LOADING_OFFQE';
export const SET_ERRORQE = 'SET_ERRORQE';

import { onSnapshot, collection } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getQuestions = () => async dispatch => {
  try {
    dispatch({type: LOADING_ONQE});
    onSnapshot(collection(db, `Questions`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          id: el.id,
          date: el.data().date,
          dni: el.data().dni,
          email: el.data().email,
          question: el.data().question,
          user: el.data().user
        });
      })
      const sortedQuestions = data.sort((a, b) => b.date.localeCompare(a.date));
      dispatch({type: GET_QUESTIONS, payload: sortedQuestions});
      dispatch({type: LOADING_OFFQE});
    });
  } catch (error) {
    dispatch({type: LOADING_OFFQE});
    dispatch({type: SET_ERRORQE, payload: error.toString()});
  }
};

export const deleteError = () => async dispatch => {
  dispatch({type: SET_ERRORQE, payload: ''});
};

export const setLoading = (loading) => async dispatch => {
  dispatch({type: LOADING_DATAQE, payload: loading});
};