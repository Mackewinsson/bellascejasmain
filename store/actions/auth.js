export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SIGNIN_LOADING = 'SIGNIN_LOADING';
export const SIGNIN_FAILED = 'SIGNIN_FAILED';

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const auth = getAuth();
import * as userActions from './user';

export const signin = (userId, password) => async dispatch => {
  dispatch({type: SIGNIN_LOADING});
  try {
    const {user} = await signInWithEmailAndPassword(auth, userId, password);
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
          resp,
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

export const signout = () => async dispatch => {
  await signOut(auth);
  await dispatch(userActions.signout());
  dispatch({
    type: SIGNOUT
  });
};
