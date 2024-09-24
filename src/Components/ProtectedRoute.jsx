// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  // If not authenticated, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If authenticated, return the requested element
  return element;
};

export default ProtectedRoute;
