import { useContext, createContext } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../services/firebase/firebaseClient";

const auth = getAuth(app);
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const value = [user, loading, error];
  return <AuthContext.Provider value={value} {...props} />;
};
