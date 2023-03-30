import { Box, Grid } from '@mui/material';
import Sidebar from '~/components/Sidebar/Sidebar';
import Header from '~/components/Header/Header';
import { useContext, useEffect, useState } from 'react';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { getAllShoes } from '~/redux/actions/shoes';
import { getAllUsers, getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';

const DefaultLayout = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');
  const { loading, setLoadingComponent } = useContext(GlobalContextProvider);

  useEffect(() => {
    dispatch(getUserInfo(accessToken, userId));
    dispatch(getAllShoes());
    dispatch(getAllUsers(accessToken)).then(() => {
      setLoadingComponent(false);
    });
  }, [loading]);

  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <Grid container>
      {showSidebar && (
        <Grid item sm={1} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar />
        </Grid>
      )}
      <Grid
        item
        sm={12}
        sx={{
          width: { xs: '100%', md: 'calc(100% - 256px)' },
          ml: { xs: '0', md: !showSidebar ? '0px' : '256px' },
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
