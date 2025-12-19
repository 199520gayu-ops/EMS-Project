import { Navigate } from "react-router-dom";

export default function ProtectedEmployeeRoute({ children }) {
  const user = localStorage.getItem("loggedUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

