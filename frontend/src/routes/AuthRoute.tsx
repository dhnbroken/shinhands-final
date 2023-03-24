import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthWrapper from '~/components/AuthWrapper/AuthWrapper';

const AuthRoute: React.FC = ({ children }: any) => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    return <Navigate to='/' replace />;
  }

  return <AuthWrapper>{children}</AuthWrapper>;
};

export default AuthRoute;
