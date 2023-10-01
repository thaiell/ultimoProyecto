import React from "react";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(null);
console.log(authUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);



  return (
    <AuthContext.Provider value={authUser}>
      {children}
    </AuthContext.Provider>
  );
};

