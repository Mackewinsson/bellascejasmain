export const GET_QUIZES = 'GET_QUIZES';
export const LOADING_DATAQ = 'LOADING_DATAQ';
export const LOADING_ONQ = 'LOADING_ONQ';
export const LOADING_OFFQ = 'LOADING_OFFQ';
export const SET_ERRORQ = 'SET_ERRORQ';

import { onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getQuizes = () => async dispatch => {
  try {
    dispatch({type: LOADING_ONQ});
    onSnapshot(collection(db, `Quizes`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          id: el.id,
          courseId: el.data().courseId,
          moduloId: el.data().moduloId,
          order: el.data().order,
          final: el.data().final,
          title: el.data().title,
          questions: el.data().questions
        });
      })
      const sortedQuizes = data.sort((a, b) => a.order - b.order);
      dispatch({type: GET_QUIZES, payload: sortedQuizes});
      dispatch({type: LOADING_OFFQ});
    });
  } catch (error) {
    dispatch({type: LOADING_OFFQ});
    dispatch({type: SET_ERRORQ, payload: error.toString()});
  }
};

export const setQuizes = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAQ, payload: '1'});
    addDoc(collection(db, 'Quizes'), {
        final: info.final,
        courseId: info.courseId,
        moduloId: info.moduloId,
        order: parseFloat(info.order),
        title: info.title,
        questions: info.questions
    }).then(function() {
      dispatch({type: LOADING_DATAQ, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAQ, payload: '0'});
      dispatch({type: SET_ERRORQ, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAQ, payload: '0'});
    dispatch({type: SET_ERRORQ, payload: error.toString()});
  }
};

export const editQuizes = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAQ, payload: '1'});
    updateDoc(doc(db, `Quizes`, info.id), {
        final: info.final,
        courseId: info.courseId,
        moduloId: info.moduloId,
        order: parseFloat(info.order),
        title: info.title,
        questions: info.questions
    }).then(function() {
      dispatch({type: LOADING_DATAQ, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAQ, payload: '0'});
      dispatch({type: SET_ERRORQ, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAQ, payload: '0'});
    dispatch({type: SET_ERRORQ, payload: error.toString()});
  }
};

export const deleteQuizes = (id) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAQ, payload: '1'});
    deleteDoc(doc(db, `Quizes`, id)).then(function() {
      dispatch({type: LOADING_DATAQ, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAQ, payload: '0'});
      dispatch({type: SET_ERRORQ, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAQ, payload: '0'});
    dispatch({type: SET_ERRORQ, payload: error.toString()});
  }
};

export const deleteError = () => async dispatch => {
  dispatch({type: SET_ERRORQ, payload: ''});
};

export const setLoading = (loading) => async dispatch => {
  dispatch({type: LOADING_DATAQ, payload: loading});
};