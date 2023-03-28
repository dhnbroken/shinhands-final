import DefaultLayout from '~/layout/DefaultLayout';
import UserLayout from '~/layout/UserLayout';

const CoreRoute = ({ children }: any) => {
  const isAdmin = sessionStorage.getItem('isAdmin');
  if (isAdmin === 'false' || !isAdmin) {
    return <UserLayout>{children}</UserLayout>;
  } else {
    return <DefaultLayout>{children}</DefaultLayout>;
  }
};

export default CoreRoute;
