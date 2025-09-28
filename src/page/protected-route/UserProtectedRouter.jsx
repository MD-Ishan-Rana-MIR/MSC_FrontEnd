import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRouter = ({ children }) => {
  // Get user token from localStorage
  const token = localStorage.getItem("user-token");

  if (!token) {
    // If not logged in, redirect to login page
    return <Navigate to="/auth" replace />;
  }

  // If token exists, render the children components
  return children;
};

export default UserProtectedRouter;
