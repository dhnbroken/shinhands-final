import React from 'react';
import { Box, Card, Link, Typography, Stack, styled } from '@mui/material';
import { ISneakerData } from '~/store/interface';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

interface Props {
  shoes: ISneakerData;
}

const ProductCard: React.FC<Props> = (props) => {
  const { shoes } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Card
      sx={{ height: { md: '400px' }, cursor: 'pointer' }}
      onClick={() => {
        pathname === '/products'
          ? navigate(`/products/${shoes?._id}`, { state: { shoes } })
          : navigate(`/shop/sneaker/${shoes?._id}`, { state: { shoes } });
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${shoes?.image}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color='inherit' underline='hover'>
          <Typography variant='subtitle2' noWrap>
            {shoes?.name}
          </Typography>
        </Link>

        <Stack direction='row' alignItems='center' justifyContent='flex-end'>
          {!shoes.salePercents ? (
            `$${shoes?.price}`
          ) : (
            <Typography variant='subtitle1'>
              <Typography
                component='span'
                variant='body1'
                sx={{
                  color: '#919EAB !important',
                  textDecoration: 'line-through !important',
                }}
              >
                {`$${shoes?.price}`}
              </Typography>
              &nbsp;
              {`$${shoes.price && Math.floor((shoes?.price * (100 - shoes.salePercents)) / 100)}`}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductCard;
