import React, { useContext, useEffect } from 'react';
import { Grid, CircularProgress, Button } from '@mui/material';
import { useAppDispatch } from '~/redux/hooks';
import { useSelector } from 'react-redux';
import { getAllShoes } from '~/redux/actions/shoes';
import { ISneakerData } from '~/store/interface';
import ProductCard from '~/components/ProductCard/ProductCard';
import { GlobalContextProvider } from '~/Context/GlobalContext';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useContext(GlobalContextProvider);
  useEffect(() => {
    dispatch(getAllShoes());
  }, [loading]);

  const { shoes } = useSelector((state: any) => state.shoesReducer);
  const { user } = useSelector((state: any) => state.userReducer);
  console.log(user);

  return loading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      {!!user.isAdmin && (
        <Button color='primary' variant='contained' sx={{ padding: '5px', marginBottom: '12px' }}>
          Add Sneaker
        </Button>
      )}
      <Grid container spacing={3}>
        {shoes &&
          shoes.map((shoes: ISneakerData, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <ProductCard shoes={shoes} />
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default Products;
