import { Box, Button, Typography, MenuItem, Grid, TextField, FormControl } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addShoes, getShoesData, updateShoes } from '~/redux/actions/shoes';
import { useAppDispatch } from '~/redux/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { ISneakerData } from '~/store/interface';
import { accessToken } from '~/utils/getCookie';

const schema = yup
  .object({
    name: yup.string().required(),
    salePercents: yup.number().required(),
    brands: yup.string(),
    description: yup.string().required(),
    category: yup.string(),
    price: yup.number().positive().integer().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { shoesInfo } = useSelector((state: any) => state.shoesReducer);

  const { state } = useLocation();

  const [isEdit, setIsEdit] = useState(false);

  console.log(state?.shoes);

  useEffect(() => {
    dispatch(getShoesData(id));
  }, []);

  useEffect(() => {
    if (id === undefined) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [id]);

  const [fileChosen, setFileChosen] = useState('');
  const [sneakerImg, setSneakerImg] = useState<any>();

  const [category, setCategory] = React.useState(state?.shoes.category || 'Sneaker');
  const [brands, setBrands] = React.useState(state?.shoes.brands || 'Nike');

  const handleChangeBrands = (event: SelectChangeEvent) => {
    setBrands(event.target.value as string);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setFileChosen(URL.createObjectURL(img));
      setSneakerImg(img);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    if (data) {
      let sneakerData: ISneakerData = {
        name: data.name,
        description: data.description,
        salePercents: data.salePercents,
        brands: data.brands,
        category: data.category,
        price: data.price,
      };
      if (sneakerImg) {
        const imageData = new FormData();
        const fileName = Date.now() + sneakerImg.name;
        imageData.append('name', fileName);
        imageData.append('file', sneakerImg);

        try {
          axios.post('http://localhost:8000/upload/', imageData);
        } catch (err) {
          console.error(err);
        }
        sneakerData = {
          ...sneakerData,
          image: fileName,
        };
      } else {
        sneakerData = { ...sneakerData, image: shoesInfo?.image };
      }
      if (!isEdit) {
        dispatch(addShoes(sneakerData, accessToken)).then(() => navigate('/products'));
      } else {
        dispatch(updateShoes(sneakerData, accessToken, id)).then(() => dispatch(getShoesData(id)));
      }
    }
  };

  return !shoesInfo ? (
    <CircularProgress />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
      <Box marginTop={2} maxHeight='200px'>
        <Grid container spacing={3}>
          <Grid item xs={6} container>
            <Grid item xs={12}>
              <Typography variant='h6'>Product Name</Typography>
              <TextField
                variant='outlined'
                className='user_textfield'
                fullWidth
                defaultValue={state?.shoes.name}
                {...register('name')}
              />
              <Typography color='error'>{errors.name?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Description</Typography>
              <TextField
                multiline
                rows={16}
                fullWidth
                className='user_textfield'
                defaultValue={state?.shoes?.description}
                {...register('description')}
              />
              <Typography color='error'>{errors.description?.message}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} container spacing={3}>
            <Grid item xs={6}>
              <Typography variant='h6'>Product Image</Typography>
              <img
                src={fileChosen || import.meta.env.VITE_PUBLIC_IMAGE_URL + shoesInfo.image}
                alt=''
                width='100%'
                height='100%'
                className='object_fit_contain mh_282'
              />
            </Grid>
            <Grid item xs={6} alignSelf='center'>
              <Button variant='contained' component='label'>
                Upload
                <input hidden accept='image/*' multiple type='file' onChange={onImageChange} />
              </Button>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='h6'>Price</Typography>
                <TextField
                  fullWidth
                  sx={{ height: '100%' }}
                  className='user_textfield'
                  type='number'
                  defaultValue={state?.shoes?.price}
                  {...register('price')}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>Sale Percent</Typography>
                <TextField
                  fullWidth
                  sx={{ height: '100%' }}
                  className='user_textfield'
                  type='number'
                  defaultValue={state?.shoes?.salePercents}
                  {...register('salePercents')}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>Category</Typography>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    defaultValue={state?.shoes.category}
                    value={category}
                    {...register('category')}
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value='Sneaker'>Sneaker</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>Brands</Typography>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    defaultValue={state?.shoes.brands}
                    value={brands}
                    {...register('brands')}
                    onChange={handleChangeBrands}
                  >
                    <MenuItem value='Nike'>Nike</MenuItem>
                    <MenuItem value='Adidas'>Adidas</MenuItem>
                    <MenuItem value='Others'>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign='end'>
            <Button variant='contained' type='submit'>
              {isEdit ? 'Save' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default EditProduct;
