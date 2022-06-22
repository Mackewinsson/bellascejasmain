export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const SIGNOUT = 'SIGNOUT';

import { onSnapshot, doc } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getUser = userId => async dispatch => {
  try {
    onSnapshot(doc(db, `Users/${userId}`), (doc) => {
      dispatch({type: GET_USER, payload: doc.data()});
    });
  } catch (error) {
    console.log(error);
  }
};


export const getUserLogin = userId => async dispatch => {
  return await new Promise(async (resolve) =>{
    try {
      onSnapshot(doc(db, `Users/${userId}`), (doc) => {
        dispatch({type: GET_USER, payload: doc.data()});
        resolve("S")
      });
    } catch (error) {
      console.log(error);
      resolve(error)
    }
  })
};

export const signout = () => async dispatch => {
  dispatch({
    type: SIGNOUT
  });
};