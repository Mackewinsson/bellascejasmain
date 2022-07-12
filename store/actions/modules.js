export const GET_MODULES = 'GET_MODULES';
export const LOADING_DATAM = 'LOADING_DATAM';
export const LOADING_ONM = 'LOADING_ONM';
export const LOADING_OFFM = 'LOADING_OFFM';
export const SET_ERROR = 'SET_ERROR';

import { onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getModules = () => async dispatch => {
  try {
    dispatch({type: LOADING_ONM});
    onSnapshot(collection(db, `Modulos`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          id: el.id,
          courseId: el.data().courseId,
          order: el.data().order,
          title: el.data().title
        });
      })
      const sortedModules = data.sort((a, b) => a.order - b.order);
      dispatch({type: GET_MODULES, payload: sortedModules});
      dispatch({type: LOADING_OFFM});
    });
  } catch (error) {
    console.log(error);
    dispatch({type: LOADING_OFFM});
  }
};

export const setModule = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAM, payload: '1'});
    addDoc(collection(db, 'Modulos'), {
      courseId: info.courseId,
      order: parseFloat(info.order),
      title: info.title
    }).then(function() {
      dispatch({type: LOADING_DATAM, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAM, payload: '0'});
      dispatch({type: SET_ERROR, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAM, payload: '0'});
    dispatch({type: SET_ERROR, payload: error.toString()});
  }
};

export const editModule = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAM, payload: '1'});
    updateDoc(doc(db, `Modulos`, info.id), {
      courseId: info.courseId,
      order: parseFloat(info.order),
      title: info.title
    }).then(function() {
      dispatch({type: LOADING_DATAM, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAM, payload: '0'});
      dispatch({type: SET_ERROR, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAM, payload: '0'});
    dispatch({type: SET_ERROR, payload: error.toString()});
  }
};

export const deleteModule = (id) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAM, payload: '1'});
    const q = query(collection(db, "Clases"), where("moduloId", "==", id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      dispatch({type: SET_ERROR, payload: 'Estimado usuario, no se puede eliminar el modulo ya que tiene clases asignadas, borre dichas clases si desea borrar este modulo.'});
    } else {
      deleteDoc(doc(db, `Modulos`, id)).then(function() {
        dispatch({type: LOADING_DATAM, payload: '0'});
      }).catch((err) => {
        dispatch({type: SET_ERROR, payload: err.toString()});
        dispatch({type: LOADING_DATAM, payload: '0'});
      });
    }
  } catch (error) {
    dispatch({type: LOADING_DATAM, payload: '0'});
    dispatch({type: SET_ERROR, payload: error.toString()});
  }
};

export const deleteError = () => async dispatch => {
  dispatch({type: SET_ERROR, payload: ''});
};

export const setLoading = (loading) => async dispatch => {
  dispatch({type: LOADING_DATAM, payload: loading});
};