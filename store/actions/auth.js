export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";
export const SIGNIN_LOADING = "SIGNIN_LOADING";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const LOADING_OFF = "LOADING_OFF";
export const SET_ERRORAUTH = "SET_ERRORAUTH";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  // generatePasswordResetLink,
} from "firebase/auth";
const auth = getAuth();
import * as userActions from "./user";
// auth().generatePasswordResetLink()

export const signin = (userId, password) => async (dispatch) => {
  dispatch({ type: SIGNIN_LOADING });
  try {
    const { user } = await signInWithEmailAndPassword(auth, userId, password);
    let resp = await dispatch(userActions.getUserLogin(user.uid));
    if (resp == "S") {
      dispatch({
        type: SIGNIN,
        payload: {
          user,
        },
      });
    } else {
      dispatch({
        type: SIGNIN_FAILED,
        payload: {
          error: resp,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: SIGNIN_FAILED,
      payload: {
        error,
      },
    });
  }
};

export const deleteError = () => async (dispatch) => {
  dispatch({ type: SET_ERRORAUTH, payload: "" });
};

export const loadingOff = () => async (dispatch) => {
  dispatch({ type: LOADING_OFF });
};

export const signout = () => async (dispatch) => {
  await signOut(auth);
  await dispatch(userActions.signout());
  dispatch({
    type: SIGNOUT,
  });
};

// forgotPassword
