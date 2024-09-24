// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create a context for authentication
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on initial load
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setUserId(decoded.sub);
      setUserRole(decoded.role);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (accessToken) => {
    const decoded = jwtDecode(accessToken);
    setUserId(decoded.sub);
    setUserRole(decoded.role);
    setIsLoggedIn(true);
    localStorage.setItem("access_token", accessToken);
  };

  const logout = () => {
    setUserId("");
    setUserRole("");
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
  };

  const value = {
    userId,
    userRole,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
