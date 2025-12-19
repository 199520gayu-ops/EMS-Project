// wraps routes that must block access until user changes password
import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthUser } from "../utils/seedUsers";

export default function RequirePasswordChange({ children }) {
  const user = getAuthUser();
  if (!user) return <Navigate to="/login" replace />;

  if (user.mustChangePassword) {
    return <Navigate to="/change-password" replace />;
  }

  return children;
}
