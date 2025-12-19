import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRole, children }) {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" />;

  if (role.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
}

