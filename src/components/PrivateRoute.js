import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../pages/Loader'; // Loader import

export default function PrivateRoute({ Component }) {
  const { isAuthenticated, loading } = useContext(AuthContext); // 🔥 `loading` state bhi use karein

  if (loading) {
    return <Loader />; // 🔥 Jab tak auth verify nahi hoti, sirf loader dikhayein
  }

  if (!isAuthenticated) {
    return <Navigate to="/authentication/login" replace />;
  }

  return <Component />;
}
