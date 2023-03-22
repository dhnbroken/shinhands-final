import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers, getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';
import { Box, Card, Link, Typography, Stack, Grid } from '@mui/material';

import { styled } from '@mui/material/styles';

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    dispatch(getAllUsers(accessToken));
  }, []);

  const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });

  return (
    <div>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            <StyledProductImg src='http://localhost:3001/assets/images/products/product_1.jpg' />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link color='inherit' underline='hover'>
              <Typography variant='subtitle2' noWrap>
                {/* {name} */}
                Name
              </Typography>
            </Link>

            <Stack direction='row' alignItems='center' justifyContent='flex-end'>
              <Typography variant='subtitle1'>
                <Typography
                  component='span'
                  variant='body1'
                  sx={{
                    color: '#919EAB !important',
                    textDecoration: 'line-through !important',
                  }}
                >
                  {/* {priceSale && fCurrency(priceSale)} */}
                  $59.00
                </Typography>
                &nbsp;
                {/* {fCurrency(price)} */}
                $50.00
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </div>
  );
};

export default User;
