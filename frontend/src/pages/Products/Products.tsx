import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  CircularProgress,
  Button,
  TextField,
  InputAdornment,
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ISneakerData } from '~/store/interface';
import ProductCard from '~/components/ProductCard/ProductCard';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useContext(GlobalContextProvider);

  const { shoes } = useSelector((state: any) => state.shoesReducer);

  const location = useLocation();

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const [sort, setSort] = React.useState('1');
  const [filter, setFilter] = React.useState(shoes);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    switch (Number(event.target.value)) {
      case 1:
        setFilter(
          [...filter].sort(
            (min: ISneakerData, max: ISneakerData) => Number(min?.price) - Number(max?.price),
          ),
        );
        break;
      case 2:
        setFilter(
          [...filter].sort(
            (min: ISneakerData, max: ISneakerData) => Number(max?.price) - Number(min?.price),
          ),
        );
        break;
      case 3:
        setFilter(
          [...filter].sort((a: ISneakerData, b: ISneakerData) => a.name.localeCompare(b.name)),
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setFilter(shoes);
  }, [shoes]);

  return loading ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Grid container marginBottom={2} spacing={2}>
        {location.pathname === '/products' && (
          <Grid item xs={12} md={2}>
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
        <Grid item xs={12} md={location.pathname === '/products' ? 7 : 9}>
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
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <Select sx={{ maxHeight: '51px' }} value={sort} onChange={handleChange}>
              <MenuItem value={1}>Price: Low to high</MenuItem>
              <MenuItem value={2}>Price: High to low</MenuItem>
              <MenuItem value={3}>A-Z</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {filter &&
          filter
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
