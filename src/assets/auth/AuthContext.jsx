import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "../utils/firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const SIGN_UP = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const LOG_IN = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    setUser(response.user);
    localStorage.setItem("user", JSON.stringify(response.user));
  };
  
  const LOG_OUT = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, LOG_IN, SIGN_UP, LOG_OUT }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
