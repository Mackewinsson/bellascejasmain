import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/Firebase";
import Index from "../pages/index"
import Admin from "../pages/admin"
import {useSelector} from 'react-redux'

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const ProtectRoute = ({ children }) => {
  const user = useSelector(state => state.user.user);
  if ((!user || user.rol !== "admin") && (window.location.pathname == '/admin' || window.location.pathname == '/cursoAdmin')){
    return <Index />;
  }
  return children;
};
