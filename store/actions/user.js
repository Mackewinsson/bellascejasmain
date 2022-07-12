export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const GET_ALL_USER = 'GET_ALL_USER';
export const SIGNOUT = 'SIGNOUT';
export const LOADING_ONU = 'LOADING_ONU';
export const LOADING_DATAU = 'LOADING_DATAU';
export const LOADING_OFFU = 'LOADING_OFFU';
export const SET_ERRORU = 'SET_ERRORU';
import moment from 'moment'
moment.locale('es')

import { onSnapshot, doc, collection, updateDoc, setDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();
import axios from 'axios';
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

export const getAllUsers = () => async dispatch => {
  try {
    dispatch({type: LOADING_ONU});
    onSnapshot(collection(db, `Users`), (docs) => {
      let data = []
      docs.forEach(el=>{
        data.push({
          id: el.id,
          name: el.data().name,
          email: el.data().email,
          phone: el.data().phone,
          dni: el.data().dni,
          rol: el.data().rol,
          estatus: el.data().estatus,
          courses: el.data().courses
        });
      })
      dispatch({type: GET_ALL_USER, payload: data});
      dispatch({type: LOADING_OFFU});
    });
  } catch (error) {
    dispatch({type: LOADING_OFFU});
    dispatch({type: SET_ERRORU, payload: error.toString()});
  }
};

export const getUserLogin = userId => async dispatch => {
  return await new Promise(async (resolve) =>{
    try {
      onSnapshot(doc(db, `Users/${userId}`), (doc) => {
        if (doc.data().estatus && doc.data().estatus == "Activo") {
          dispatch({type: GET_USER, payload: doc.data()});
          resolve("S")
        } else {
          resolve("Estimado usuario, su cuenta ha sido eliminada, contáctenos para más información.")
        }
      });
    } catch (error) {
      console.log(error);
      resolve(error)
    }
  })
};

export const setUser = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAU, payload: '1'});
    const q = query(collection(db, "Users"), where("email", "==", info.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      dispatch({type: SET_ERRORU, payload: 'Estimado usuario, el correo ingresado ya existe en nuestro sistema'});
      dispatch({type: LOADING_DATAU, payload: '0'});
    } else {
      const {user} = await createUserWithEmailAndPassword(auth, info.email, info.password);
      if (user && user.uid) {
        setDoc(doc(db, "Users", user.uid), {
          name: info.name,
          email: info.email,
          phone: info.phone,
          createUser: moment().format('DD/MM/YYYY H:mm A'),
          estatus: "Activo",
          dni: info.dni,
          rol: info.rol,
          courses: info.courses
        }).then(function() {
          let headrs = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          axios.post('https://microbladingacademy.herokuapp.com/consultas/sendCredentiales', JSON.stringify(info), {headers: headrs}).then(async (response) => {
            if (!response || !response.data || !response.data.success) {
              dispatch({type: SET_ERRORU, payload: 'Error inexperado, contacte con el administrador.'});
            }
            dispatch({type: LOADING_DATAU, payload: '0'});
          }).catch((err)=> {
            console.log(err)
            dispatch({type: SET_ERRORU, payload: 'Estimado usuario, ha ocurrido un error al enviar las credenciales por correo.'});
            dispatch({type: LOADING_DATAU, payload: '0'});
          })
        }).catch((error) => {
          dispatch({type: SET_ERRORU, payload: error.toString()});
          dispatch({type: LOADING_DATAU, payload: '0'});
        });
      } else {
        dispatch({type: SET_ERRORU, payload: "Error al crear el usuario, intente de nuevo o llame al administrador."});
        dispatch({type: LOADING_DATAU, payload: '0'});
      }
    }
  } catch (error) {
    dispatch({type: SET_ERRORU, payload: error.toString()});
    dispatch({type: LOADING_DATAU, payload: '0'});
  }
};

export const editUser = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAU, payload: '1'});
    updateDoc(doc(db, `Users`, info.id), {
      name: info.name,
      phone: info.phone,
      editUser: moment().format('DD/MM/YYYY H:mm A'),
      estatus: info.estatus,
      dni: info.dni,
      rol: info.rol,
    }).then(async function() {
      dispatch({type: LOADING_DATAU, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAU, payload: '0'});
      dispatch({type: SET_ERRORU, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAU, payload: '0'});
    dispatch({type: SET_ERRORU, payload: error.toString()});
  }
};

export const deleteUser = (info) => async dispatch => {
  try {
    dispatch({type: LOADING_DATAU, payload: '1'});
    updateDoc(doc(db, `Users`, info), {
      deleteUser: moment().format('DD/MM/YYYY H:mm A'),
      estatus: "Eliminado"
    }).then(async function() {
      dispatch({type: LOADING_DATAU, payload: '0'});
    }).catch((error) => {
      dispatch({type: LOADING_DATAU, payload: '0'});
      dispatch({type: SET_ERRORU, payload: error.toString()});
    });
  } catch (error) {
    dispatch({type: LOADING_DATAU, payload: '0'});
    dispatch({type: SET_ERRORU, payload: error.toString()});
  }
};

export const deleteError = () => async dispatch => {
  dispatch({type: SET_ERRORU, payload: ''});
};

export const setLoading = (loading) => async dispatch => {
  dispatch({type: LOADING_DATAU, payload: loading});
};

export const signout = () => async dispatch => {
  dispatch({
    type: SIGNOUT
  });
};