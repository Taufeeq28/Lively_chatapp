import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const setAuthenticated = (value) => {
    setIsAuthenticated(value);
  };

  const checkAuth = () => {
    const token = Cookies.get("authToken");
    console.log("Checking authentication...");
    console.log("Token:", token); // Log the token value to debug
    if (token) {
      console.log("Token exists. Setting authenticated to true.");
      setAuthenticated(true);
    } else {
      console.log("Token does not exist. Setting authenticated to false.");
      setAuthenticated(false);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
