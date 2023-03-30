import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDesc from './ProductDesc';
import SneakerSize from './Size';

const ProductInfo: React.FC = () => {
  const { state } = useLocation();
  const { shoes } = state;
  console.log(shoes);
  return (
    <Container sx={{ width: { md: '1080px' }, margin: 'auto' }}>
      <Grid
        container
        spacing={2}
        sx={{ maxHeight: { md: '700px' } }}
        paddingTop='15px'
        marginBottom='24px'
      >
        <Grid item xs={12} md={7}>
          <img
            src={import.meta.env.VITE_PUBLIC_IMAGE_URL + shoes.image}
            alt={shoes.name}
            width='100%'
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={2} flexDirection='column'>
            <Grid item xs={12}>
              <Typography variant='h4' color='#555' fontWeight={700} fontSize='1.7em'>
                {shoes.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' color='#000' fontWeight={500} fontSize='1.5em'>
                ${shoes.price}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SneakerSize />
            </Grid>
            <Grid item xs={12}>
              <ProductDesc shoesDescription={shoes.description} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductInfo;
