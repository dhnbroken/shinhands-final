import React from 'react';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { logout } from '~/redux/actions/auth';

const ListDrawer = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');
  const isAdmin = sessionStorage.getItem('isAdmin');
  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const handleLogout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleListItemClick(e, 3);
    dispatch(logout(accessToken)).then(() => navigate('/'));
  };
  return (
    <List>
      <ListItem disablePadding>
        <Link to={`/user/${userId}`} className='w-100'>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <UserOutlined />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItemButton>
        </Link>
      </ListItem>
      <Divider />

      {isAdmin === 'true' && (
        <React.Fragment>
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
                <ShoppingOutlined />
              </ListItemIcon>
              <ListItemText>Products</ListItemText>
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      )}
      <Divider />

      <ListItem disablePadding>
        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => {
            handleListItemClick(event, 6);
            navigate('/shop/sneaker');
          }}
        >
          <ListItemIcon>
            <ShoppingOutlined />
          </ListItemIcon>
          <ListItemText>{isAdmin === 'true' ? 'Shop' : 'Sneaker'}</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />

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

export default ListDrawer;
