import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLoading, user } = useAuth()!;

  if (isLoading) return <h1>Loading</h1>;

  if (!user) return <Navigate to={'/login'} />;

  return <>{children}</>;
};
