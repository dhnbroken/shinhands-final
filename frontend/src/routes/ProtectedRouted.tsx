import { Navigate } from 'react-router-dom';
import DefaultLayout from '~/layout/DefaultLayout';

const ProtectedRoute = ({ children }: any) => {
  const isAdmin = sessionStorage.getItem('isAdmin');
  if (isAdmin === 'false') {
    return <Navigate to='/' replace />;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
};

export default ProtectedRoute;
