import React from 'react';
import {
  Toolbar,
  IconButton,
  Box,
  FormControl,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { BellOutlined, MenuFoldOutlined, SearchOutlined } from '@ant-design/icons';

import './Header.scss';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavDrawer from '../NavBar/NavDrawer';

interface Props {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = (props) => {
  const { setShowSidebar, showSidebar } = props;
  const { user } = useSelector((state: any) => state.userReducer);
  const navigate = useNavigate();

  return (
    <Toolbar sx={{ borderBottom: '1px solid #f0f0f0', justifyContent: { xs: 'space-between' } }}>
      <IconButton className='header_btn' onClick={() => setShowSidebar(!showSidebar)}>
        <MenuFoldOutlined style={{ fontSize: '20px' }} />
      </IconButton>
      <Box
        marginLeft='8px'
        width='100%'
        maxHeight={'35px'}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <FormControl sx={{ maxHeight: '35px' }}>
          <TextField
            size='small'
            className='header_input_search'
            id='outlined-start-adornment'
            sx={{ width: { md: '25ch' } }}
            placeholder='Ctrl + K'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <IconButton
        className='header_btn'
        sx={{ marginRight: '24px', display: { xs: 'none', md: 'block' } }}
      >
        <BellOutlined style={{ fontSize: '20px' }} />
      </IconButton>
      <Button
        variant='text'
        sx={{ color: 'black', textTransform: 'none' }}
        startIcon={
          <Avatar
            alt={user?.username}
            src={
              import.meta.env.VITE_PUBLIC_IMAGE_URL + user?.avatar ||
              'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=500w'
            }
          />
        }
        onClick={() => {
          navigate(`/user/${user._id}`);
        }}
      >
        {user?.username}
      </Button>
      <NavDrawer />
    </Toolbar>
  );
};

export default Header;
