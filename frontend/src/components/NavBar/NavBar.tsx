import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material/';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

const Navbar: React.FC = () => {
  return (
    <header className='d-flex user_header'>
      <div className='w-100'>
        <Grid
          container
          spacing={3}
          sx={{ margin: 'auto 20px', alignItems: 'center', maxWidth: '1400px' }}
        >
          <Grid item xs={7} sx={{ paddingTop: '0px !important' }}>
            <div className='nav-item'>
              <Link to={'/'}>
                <img
                  src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}logo_AM.png`}
                  alt=''
                  width='83'
                  height='40'
                />
              </Link>
              <Typography variant='h5'>
                <Link to={'/shop/sneaker'}>Sneaker</Link>
              </Typography>
              <Typography variant='h5'>
                <Link to={'/'}>Clothes</Link>
              </Typography>
              <Typography variant='h5'>
                <Link to={'/'}>About</Link>
              </Typography>
              <Typography variant='h5'>
                <Link to={'/'}>More</Link>
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              paddingTop: '0px !important',
            }}
          >
            <div className='nav-item'>
              <Add sx={{ fontWeight: 'bold' }} />
              <div className='language'>En</div>
              <NavMenu />
            </div>
          </Grid>
        </Grid>
      </div>
    </header>
  );
};

export default Navbar;
