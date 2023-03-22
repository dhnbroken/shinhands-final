import React from 'react';
import { Box, Drawer, CssBaseline, AppBar } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';

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
        <Box display={'flex'} justifyItems='center' alignItems='center' padding='15px 10px'>
          <AcUnitIcon color='primary' fontSize='large' /> Admin Dashboard
        </Box>
        <SidebarList />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
