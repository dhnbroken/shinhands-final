import { Box, Grid } from '@mui/material';
import Sidebar from '~/components/Sidebar/Sidebar';
import Header from '~/components/Header/Header';
import { useState } from 'react';

const DefaultLayout = ({ children }: any) => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <Grid container>
      {showSidebar && (
        <Grid item sm={1} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Sidebar />
        </Grid>
      )}
      <Grid
        item
        sm={11}
        md={12}
        sx={{
          width: { xs: '100%', sm: 'calc(100% - 256px)' },
          ml: { xs: '0', sm: !showSidebar ? '0px' : '256px' },
        }}
      >
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Box padding='24px' component='main'>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
