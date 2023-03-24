import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const { loading, setLoading } = useContext(GlobalContextProvider);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => setLoading(true), []);
  useEffect(() => {
    dispatch(getUserInfo(accessToken, userId)).then(() => setLoading(false));
  }, [loading]);

  const { user } = useSelector((state: any) => state.userReducer);

  return loading ? <CircularProgress /> : <div>{user ? user.username : 'please login'}</div>;
};

export default Home;
