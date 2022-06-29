import { useContext, createContext } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../../services/firebase/firebaseClient";
import {useSelector} from 'react-redux';
import { useRouter } from 'next/router'

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const value = [user, loading, error];
  return <AuthContext.Provider value={value} {...props} />;
};

export const ProtectRoute = ({ children }) => {
  const user = useSelector(state => state.user.user);
  const router = useRouter()
  if ((!user || user.rol !== "admin") &&
    (window.location.pathname == '/admin' ||
    window.location.pathname == '/cursosAdmin' ||
    window.location.pathname == '/modulesAdmin' ||
    window.location.pathname == '/classsesAdmin' ||
    window.location.pathname == '/questionsAdmin' ||
    window.location.pathname == '/quizesAdmin' ||
    window.location.pathname == '/userAdmin' ||
    window.location.pathname == '/paymentAdmin')
  ) {
    router.push("/")
    return null;
  }
  if (user && user.rol == "admin" && (window.location.pathname == '/' || window.location.pathname == '/login')){
    router.push("/admin")
    return null;
  }
  return children;
};

