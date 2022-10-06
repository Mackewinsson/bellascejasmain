export const GET_SERVICES = 'GET_SERVICES';

import { onSnapshot, collection } from "firebase/firestore";
import db from '../../services/firebase/firebaseClient';

export const getServices = () => async dispatch => {
  try {
    onSnapshot(collection(db, `Servicios`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          title: el.data().title,
          price: el.data().price,
          section: el.data().section
        });
      })
      dispatch({
        type: GET_SERVICES,
        payload: data
      })
    });
  } catch (error) {

  }
};