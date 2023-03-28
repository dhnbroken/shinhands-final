import React, { useContext, useEffect, useState } from 'react';
import { Grid, CircularProgress, Button, TextField, InputAdornment } from '@mui/material';
import { useAppDispatch } from '~/redux/hooks';
import { useSelector } from 'react-redux';
import { getAllShoes } from '~/redux/actions/shoes';
import { ISneakerData } from '~/store/interface';
import ProductCard from '~/components/ProductCard/ProductCard';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useContext(GlobalContextProvider);
  useEffect(() => {
    dispatch(getAllShoes());
  }, [loading]);

  const { shoes } = useSelector((state: any) => state.shoesReducer);
  const { user } = useSelector((state: any) => state.userReducer);

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  console.log(user);
  return loading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Grid container marginBottom={2}>
        {!!user?.isAdmin && (
          <Grid item xs={2}>
            <Button
              color='primary'
              variant='contained'
              sx={{ padding: '13.5px' }}
              onClick={() => navigate('/products/add')}
            >
              Add Sneaker
            </Button>
          </Grid>
        )}
        <Grid item xs={10}>
          <TextField
            className='djashjdshjad'
            variant='outlined'
            value={search}
            placeholder='Search by name...'
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') setQuery(search);
            }}
            fullWidth
            InputProps={{
              sx: { padding: '5px 0' },
              startAdornment: (
                <InputAdornment position='start'>
                  <Search sx={{ marginLeft: '12px' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {shoes &&
          shoes
            .filter((shoes: ISneakerData) => shoes.name && shoes.name.toLowerCase().includes(query))
            .map((shoes: ISneakerData, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <ProductCard shoes={shoes} />
              </Grid>
            ))}
      </Grid>
    </React.Fragment>
  );
};

export default Products;
