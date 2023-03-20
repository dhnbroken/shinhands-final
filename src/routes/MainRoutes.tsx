import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthWrapper from '~/components/AuthWrapper/AuthWrapper';
import DefaultLayout from '~/layout/DefaultLayout';
import { publicRoutes, authRoutes } from './routes';

const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

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
              getAccessToken() ? (
                <Navigate to='/' />
              ) : (
                <AuthWrapper>
                  <Page />
                </AuthWrapper>
              )
            }
          />
        );
      })}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default MainRoutes;
