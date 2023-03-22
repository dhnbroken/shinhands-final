import React from 'react';
import AcUnit from '@mui/icons-material/AcUnit';
import { Grid } from '@mui/material';

const AuthHeader: React.FC = () => {
  return (
    <Grid item xs={12} marginTop='24px' marginLeft='24px' display='flex' alignItems='center'>
      <AcUnit color='primary' fontSize='large' /> User Management
    </Grid>
  );
};

export default AuthHeader;
