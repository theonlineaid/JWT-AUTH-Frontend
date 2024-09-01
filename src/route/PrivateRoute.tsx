
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute: React.FC = () => {
  const { user: isAuthenticated, loading} = useAuth();

  console.log(isAuthenticated)

  if (loading) {
    // Show a loading spinner or placeholder while checking auth
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
