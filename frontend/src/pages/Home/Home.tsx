import React, { useEffect } from 'react';
import { getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';
import Products from '../Products/Products';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    dispatch(getUserInfo(accessToken, userId));
  }, []);

  return (
    <div>
      <Products />
    </div>
  );
};

export default Home;
