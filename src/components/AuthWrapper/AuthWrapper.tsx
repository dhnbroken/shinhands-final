import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
// import AuthCard from './AuthCard';
// import Logo from 'components/Logo';
// import AuthFooter from 'components/cards/AuthFooter';

// assets
import AuthFooter from '../AuthFooter/AuthFooter';
import AuthBackground from '../../assets/images/auth/AuthBackground';
import AuthHeader from '../AuthHeader/AuthHeader';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: any) => (
  <Box sx={{ minHeight: '100vh' }}>
    <AuthBackground />
    <Grid
      container
      direction='column'
      justifyContent='flex-end'
      sx={{
        minHeight: '100vh',
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <AuthHeader />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent='center'
          alignItems='center'
          sx={{ minHeight: { xs: 'calc(100vh - 150px)', md: 'calc(100vh - 137px)' } }}
        >
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
