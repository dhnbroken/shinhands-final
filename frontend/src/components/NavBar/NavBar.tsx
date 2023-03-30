import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material/';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import NavDrawer from './NavDrawer';

const Navbar: React.FC = () => {
  return (
    <header className='d-flex user_header'>
      <div className='w-100'>
        <Grid
          container
          spacing={3}
          sx={{ margin: { xs: '0', md: 'auto 20px' }, alignItems: 'center', maxWidth: '1400px' }}
        >
          <Grid item xs={6} md={7} sx={{ paddingTop: '0px !important', paddingLeft: { xs: 0 } }}>
            <div className='nav-item'>
              <Link to={'/'}>
                <img
                  src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}logo_AM.png`}
                  alt=''
                  width='83'
                  height='40'
                />
              </Link>
              <Typography variant='h5' display={{ xs: 'none', md: 'block' }}>
                <Link to={'/shop/sneaker'}>Sneaker</Link>
              </Typography>
              <Typography variant='h5' display={{ xs: 'none', md: 'block' }}>
                <Link to={'/'}>Clothes</Link>
              </Typography>
              <Typography variant='h5' display={{ xs: 'none', md: 'block' }}>
                <Link to={'/'}>About</Link>
              </Typography>
              <Typography variant='h5' display={{ xs: 'none', md: 'block' }}>
                <Link to={'/'}>More</Link>
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={1}
            md={4}
            sx={{
              paddingTop: '0px !important',
            }}
          >
            <div className='nav-item'>
              <Add sx={{ fontWeight: 'bold', display: { xs: 'none' } }} />
              <NavMenu />
            </div>
          </Grid>
          <NavDrawer />
        </Grid>
      </div>
    </header>
  );
};

export default Navbar;
