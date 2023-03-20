import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import {
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { signout } from '~/API/auth';
import { GlobalContextProvider } from '~/Context/GlobalContext';

const SidebarList = () => {
  const { setUsers, setLoading, loading, setUser } = useContext(GlobalContextProvider);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleListItemClick(e, 3);
    signout(accessToken)
      .then(() => {
        setUsers([]);
        setUser({});
      })
      .then(() => setLoading(false));
    setAccessToken('');
  };

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'));
  }, [accessToken, loading]);

  return (
    <List>
      <Box className='sidebar_sub'>
        <Typography variant='h6'>Navigation</Typography>
      </Box>
      <ListItem disablePadding>
        <Link to='/' className='w-100'>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </Link>
      </ListItem>
      <Box className='sidebar_sub'>
        <Typography variant='h6'>Authentication</Typography>
      </Box>
      {!accessToken ? (
        <React.Fragment>
          <ListItem disablePadding>
            <Link to='/login' className='w-100'>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to='/register' className='w-100'>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <ProfileOutlined />
                </ListItemIcon>
                <ListItemText>Register</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </React.Fragment>
      ) : (
        <ListItem disablePadding>
          <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleLogout(event)}>
            <ListItemIcon>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
};

export default SidebarList;
