import React from 'react';
import { Box, Drawer, CssBaseline, AppBar } from '@mui/material';

import './Sidebar.scss';
import SidebarList from './SidebarList';

const drawerWidth = 256;

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        className='bipbip'
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          maxWidth: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Box display={'flex'} justifyContent='center' width={'100%'} padding='15px 10px'>
          <img src={import.meta.env.VITE_PUBLIC_IMAGE_URL + 'logo_AM.png'} alt='logo' width={60} />
        </Box>
        <SidebarList />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
