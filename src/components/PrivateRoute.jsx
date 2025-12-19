import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("authUser"));

  // not logged in
  if (!user) return <Navigate to="/" replace />;

  // role restriction
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PrivateRoute;
