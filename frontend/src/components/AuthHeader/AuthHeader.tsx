import React from 'react';
import { Box, Grid } from '@mui/material';

const AuthHeader: React.FC = () => {
  return (
    <Grid item xs={12} marginTop='24px' marginLeft='24px' display='flex' alignItems='center'>
      <Box sx={{ margin: 'auto' }}>
        <img src={import.meta.env.VITE_PUBLIC_IMAGE_URL + 'logo_AM.png'} alt='logo' width={100} />
      </Box>
    </Grid>
  );
};

export default AuthHeader;
