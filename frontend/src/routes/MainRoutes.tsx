import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/layout/DefaultLayout';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRouted';
import { publicRoutes, authRoutes, adminRoute } from './routes';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <DefaultLayout>
                <Page />
              </DefaultLayout>
            }
          />
        );
      })}
      {authRoutes.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <AuthRoute>
                <Page />
              </AuthRoute>
            }
          />
        );
      })}
      {adminRoute.map((route, index) => {
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute>
                <Page />
              </ProtectedRoute>
            }
          />
        );
      })}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default MainRoutes;
