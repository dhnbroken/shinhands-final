import Container from '@mui/material/Container';
import React from 'react';
import Navbar from '~/components/NavBar/NavBar';

const UserLayout = ({ children }: any) => {
  return (
    <React.Fragment>
      <Navbar />
      <Container sx={{ marginTop: '80px' }}>{children}</Container>
    </React.Fragment>
  );
};

export default UserLayout;
