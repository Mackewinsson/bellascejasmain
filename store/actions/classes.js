export const GET_CLASSES = 'GET_CLASSES';
export const LOADING_DATACL = 'LOADING_DATACL';
export const LOADING_ONCL = 'LOADING_ONCL';
export const LOADING_OFFCL = 'LOADING_OFFCL';
export const SET_ERRORCL = 'SET_ERRORCL';

import { onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getClasses = () => async dispatch => {
  try {
    dispatch({type: LOADING_ONCL});
    onSnapshot(collection(db, `Clases`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          id: el.id,
          classNotes: el.data().classNotes ? el.data().classNotes : "",
          courseId: el.data().courseId,
          moduloId: el.data().moduloId,
          order: el.data().order,
          orderModule: el.data().orderModule,
          title: el.data().title,
          videoUrl: el.data().videoUrl
        });
      })
      const sortedClasses = data.sort((a, b) => a.order - b.order);
      dispatch({type: GET_CLASSES, payload: sortedClasses});
      dispatch({type: LOADING_OFFCL});
    });
  } catch (error) {
    dispatch({type: LOADING_OFFCL});
    dispatch({type: SET_ERRORCL, payload: error.toString()});
  }
};

export const setClass = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATACL, payload: '1'});
    addDoc(collection(db, 'Clases'), {
        classNotes: info.classNotes,
        courseId: info.courseId,
        moduloId: info.moduloId,
        order: parseFloat(info.order),
        orderModule: parseFloat(info.orderModule),
        title: info.title,
        videoUrl: info.videoUrl
    }).then(function() {
      dispatch({type: LOADING_DATACL, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATACL, payload: '0'});
      dispatch({type: SET_ERRORCL, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATACL, payload: '0'});
    dispatch({type: SET_ERRORCL, payload: error.toString()});
  }
};

export const editClass = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATACL, payload: '1'});
    updateDoc(doc(db, `Clases`, info.id), {
        classNotes: info.classNotes,
        courseId: info.courseId,
        moduloId: info.moduloId,
        order: parseFloat(info.order),
        orderModule: parseFloat(info.orderModule),
        title: info.title,
        videoUrl: info.videoUrl
    }).then(function() {
      dispatch({type: LOADING_DATACL, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATACL, payload: '0'});
      dispatch({type: SET_ERRORCL, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATACL, payload: '0'});
    dispatch({type: SET_ERRORCL, payload: error.toString()});
  }
};

export const deleteClass = (id) => async dispatch => {
  try {
    dispatch({type: LOADING_DATACL, payload: '1'});
    deleteDoc(doc(db, `Clases`, id)).then(function() {
      dispatch({type: LOADING_DATACL, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATACL, payload: '0'});
      dispatch({type: SET_ERRORCL, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATACL, payload: '0'});
    dispatch({type: SET_ERRORCL, payload: error.toString()});
  }
};

export const deleteError = () => async dispatch => {
  dispatch({type: SET_ERRORCL, payload: ''});
};

export const setLoading = (loading) => async dispatch => {
  dispatch({type: LOADING_DATACL, payload: loading});
};