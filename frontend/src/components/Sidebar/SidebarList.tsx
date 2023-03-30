import React, { useState } from 'react';
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
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/redux/hooks';
import { logout } from '~/redux/actions/auth';

const SidebarList = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const accessToken = sessionStorage.getItem('accessToken');
  const isAdmin = sessionStorage.getItem('isAdmin');

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const dispatch = useAppDispatch();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleListItemClick(e, 3);
    dispatch(logout(accessToken)).then(() => navigate('/'));
  };

  return (
    <List>
      <Box className='sidebar_sub'>
        <Typography variant='h6'>Navigation</Typography>
      </Box>
      <ListItem disablePadding>
        <Link to='/dashboard' className='w-100'>
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
      {isAdmin && isAdmin === 'true' && (
        <React.Fragment>
          <Box className='sidebar_sub'>
            <Typography variant='h6'>Manager</Typography>
          </Box>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4);
                navigate('/user');
              }}
            >
              <ListItemIcon>
                <TeamOutlined />
              </ListItemIcon>
              <ListItemText>User</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => {
                handleListItemClick(event, 5);
                navigate('/products');
              }}
            >
              <ListItemIcon>
                <ShopOutlined />
              </ListItemIcon>
              <ListItemText>Products</ListItemText>
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      )}

      <React.Fragment>
        <Box className='sidebar_sub'>
          <Typography variant='h6'>Shop</Typography>
        </Box>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 6}
            onClick={(event) => {
              handleListItemClick(event, 6);
              navigate('/shop/sneaker');
            }}
          >
            <ListItemIcon>
              <ShopOutlined />
            </ListItemIcon>
            <ListItemText>Sneaker</ListItemText>
          </ListItemButton>
        </ListItem>
      </React.Fragment>

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
