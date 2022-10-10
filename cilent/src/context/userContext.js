/** @format */

import {useState, createContext, useContext, useEffect} from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(false);

  const value = {
    user,
    setUser,
  };

  useEffect(() => {}, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
