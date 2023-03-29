import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/redux/hooks';
import { logout } from '~/redux/actions/auth';
import { Login } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { DashOutlined } from '@ant-design/icons';

export default function NavMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useSelector((state: any) => state.userReducer);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <Avatar
                alt={user?.username}
                src={
                  import.meta.env.VITE_PUBLIC_IMAGE_URL + user?.avatar ||
                  'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=500w'
                }
              />
            </Avatar>
            <Typography variant='h6' sx={{ color: '#fff', marginLeft: '12px' }}>
              {user?.username}
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/user/${user._id}`);
          }}
        >
          <Avatar /> My account
        </MenuItem>
        <Divider />
        {user?.isAdmin && (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate('/dashboard');
            }}
          >
            <ListItemIcon>
              <DashOutlined />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            user ? dispatch(logout(accessToken)).then(() => navigate('/')) : navigate('/login');
          }}
        >
          {user ? (
            <>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </>
          ) : (
            <>
              <ListItemIcon>
                <Login fontSize='small' />
              </ListItemIcon>
              Login
            </>
          )}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
