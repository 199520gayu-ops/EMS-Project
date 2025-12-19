// src/components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../AppContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useApp();

  if (!user.isAuthenticated) return <Navigate to="/" />;
  
  return allowedRoles.includes(user.role) 
    ? <Outlet /> 
    : <div style={{padding: '20px'}}><h2>403 - Unauthorized Access</h2></div>;
};

export default ProtectedRoute;