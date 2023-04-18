import Container from '@mui/material/Container';
import Navbar from '~/components/NavBar/NavBar';
import React, { useContext, useEffect } from 'react';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { getAllShoes } from '~/redux/actions/shoes';
import { getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';

const UserLayout = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');
  const { loading } = useContext(GlobalContextProvider);

  console.log(accessToken);
  console.log(userId);

  useEffect(() => {
    dispatch(getUserInfo(accessToken, userId));
    dispatch(getAllShoes());
  }, [loading]);

  return (
    <React.Fragment>
      <Navbar />
      <Container sx={{ marginTop: '80px' }}>{children}</Container>
    </React.Fragment>
  );
};

export default UserLayout;
