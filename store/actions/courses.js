export const GET_COURSES = 'GET_COURSES';
export const LOADING_DATAC = 'LOADING_DATAC';
export const LOADING_ONC = 'LOADING_ONC';
export const LOADING_OFFC = 'LOADING_OFFC';
export const SET_ERRORC = 'SET_ERRORC';

import { onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getCourses = () => async dispatch => {
  try {
    dispatch({type: LOADING_ONC});
    onSnapshot(collection(db, `Cursos`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          id: el.id,
          title: el.data().title,
          description: el.data().description,
          validity: el.data().validity,
          amount: el.data().amount,
          instructions: el.data().instructions,
          thumbnail: el.data().thumbnail,
          teacher: el.data().teacher,
        });
      })
      dispatch({type: GET_COURSES, payload: data});
      dispatch({type: LOADING_OFFC});
    });
  } catch (error) {
    dispatch({type: LOADING_OFFC});
    dispatch({type: SET_ERRORC, payload: error.toString()});
  }
};

export const setCourse = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAC, payload: '1'});
    addDoc(collection(db, 'Cursos'), {
      title: info.title,
      thumbnail: info.thumbnail,
      teacher: info.teacher,
      validity: parseFloat(info.validity),
      description: info.description,
      amount: parseFloat(info.amount),
      instructions: info.instructions
    }).then(function() {
      dispatch({type: LOADING_DATAC, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAC, payload: '0'});
      dispatch({type: SET_ERRORC, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAC, payload: '0'});
    dispatch({type: SET_ERRORC, payload: error.toString()});
  }
};

export const editCourse = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAC, payload: '1'});
    updateDoc(doc(db, `Cursos`, info.id), {
      title: info.title,
      thumbnail: info.thumbnail,
      teacher: info.teacher,
      validity: parseFloat(info.validity),
      description: info.description,
      amount: parseFloat(info.amount),
      instructions: info.instructions
    }).then(function() {
      dispatch({type: LOADING_DATAC, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAC, payload: '0'});
      dispatch({type: SET_ERRORC, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAC, payload: '0'});
    dispatch({type: SET_ERRORC, payload: error.toString()});
  }
};


export const deleteCourse = (id) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAC, payload: '1'});
    const q = query(collection(db, "Modulos"), where("courseId", "==", id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      dispatch({type: SET_ERRORC, payload: 'Estimado usuario, no se puede eliminar el curso ya que tiene modulos asignadas, borre dichos modulos si desea borrar este curso.'});
    } else {
      deleteDoc(doc(db, `Cursos`, id)).then(function() {
        dispatch({type: LOADING_DATAC, payload: '0'});
      }).catch((err) => {
        dispatch({type: LOADING_DATAC, payload: '0'});
        dispatch({type: SET_ERRORC, payload: err.toString()});
      });
    }
  } catch (error) {
    dispatch({type: LOADING_DATAC, payload: '0'});
    dispatch({type: SET_ERRORC, payload: error.toString()});
  }
};

export const deleteError = () => async dispatch => {
  dispatch({type: SET_ERRORC, payload: ''});
};

export const setLoading = (loading) => async dispatch => {
  dispatch({type: LOADING_DATAC, payload: loading});
};