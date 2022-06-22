import { useContext, createContext } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../services/firebase/firebaseClient";
import Index from "../../pages/index";
import Admin from "../../pages/admin";
import {useSelector} from 'react-redux';

const auth = getAuth(app);
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const value = [user, loading, error];
  return <AuthContext.Provider value={value} {...props} />;
};

export const ProtectRoute = ({ children }) => {
  const user = useSelector(state => state.user.user);
  if ((!user || user.rol !== "admin") && (window.location.pathname == '/admin' || window.location.pathname == '/cursoAdmin')){
    return <Index />;
  }
  return children;
};

