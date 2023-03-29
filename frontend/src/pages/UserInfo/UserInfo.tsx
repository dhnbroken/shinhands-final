import { Box, Button, Card, CardContent, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '~/redux/actions/userActions';
import { getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';
import { IUser } from '~/store/interface';

import './UserInfo.scss';

const UserInfo: React.FC = () => {
  const { user } = useSelector((state: any) => state.userReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [fileChosen, setFileChosen] = useState('');
  const [avatar, setAvatar] = useState<any>();
  const accessToken = sessionStorage.getItem('accessToken');

  const { handleSubmit, register } = useForm<IUser>();

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setFileChosen(URL.createObjectURL(img));
      setAvatar(img);
    }
  };
  const formSubmitHandler: SubmitHandler<IUser> = (data: IUser) => {
    if (data) {
      let updateData: IUser = {
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNumber: data.phoneNumber,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        country: data.country,
      };
      if (avatar) {
        const imageData = new FormData();
        const fileName = Date.now() + avatar.name;
        imageData.append('name', fileName);
        imageData.append('file', avatar);

        try {
          axios.post('http://localhost:8000/upload/', imageData);
        } catch (err) {
          console.error(err);
        }

        updateData = {
          ...updateData,
          avatar: fileName,
        };
      }
      !!accessToken &&
        !!user._id &&
        dispatch(updateUser(updateData, accessToken, user._id)).then(() =>
          dispatch(getUserInfo(accessToken, id as string)),
        );
    }
  };
  return (
    <form action='' onSubmit={handleSubmit(formSubmitHandler)} encType='multipart/form-data'>
      {!!user && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: '100%',
            },
          }}
        >
          <Paper elevation={3}>
            <Grid container padding={3}>
              <Grid item xs={5} padding={5}>
                <Card
                  sx={{
                    width: '100%',
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div className='avatar'>
                    <img
                      alt='avatar'
                      className='avatar__image'
                      src={
                        fileChosen ||
                        (user?.avatar && import.meta.env.VITE_PUBLIC_IMAGE_URL + user?.avatar) ||
                        'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=500w'
                      }
                    />
                  </div>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant='h5' component='div'>
                      {user?.username}
                    </Typography>
                  </CardContent>
                  <Button variant='contained' component='label'>
                    Upload
                    <input hidden accept='image/*' multiple type='file' onChange={onImageChange} />
                  </Button>
                </Card>
              </Grid>
              <Grid item container xs={7} padding={5} spacing={3}>
                <Grid item container spacing={2} xs={12}>
                  <Grid item xs={6}>
                    <TextField
                      label='Firstname'
                      variant='outlined'
                      fullWidth
                      defaultValue={user?.firstname}
                      className='user_textfield'
                      {...register('firstname')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='medium'
                      variant='outlined'
                      fullWidth
                      label='Lastname'
                      className='user_textfield'
                      defaultValue={user?.lastname}
                      {...register('lastname')}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size='medium'
                    variant='outlined'
                    fullWidth
                    label='Phone Number'
                    className='user_textfield'
                    defaultValue={user?.phoneNumber}
                    {...register('phoneNumber')}
                  />
                </Grid>
                <Grid item container spacing={2} xs={12}>
                  <Grid item xs={6}>
                    <TextField
                      label='Address line 1'
                      variant='outlined'
                      fullWidth
                      defaultValue={user?.addressLine1}
                      className='user_textfield'
                      {...register('addressLine1')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='medium'
                      variant='outlined'
                      fullWidth
                      label='Address line 2'
                      className='user_textfield'
                      defaultValue={user?.addressLine2}
                      {...register('addressLine2')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='medium'
                      variant='outlined'
                      fullWidth
                      label='City'
                      className='user_textfield'
                      defaultValue={user?.city}
                      {...register('city')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size='medium'
                      variant='outlined'
                      fullWidth
                      label='Country'
                      className='user_textfield'
                      defaultValue={user?.country}
                      {...register('country')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: 'end',
                  padding: '4px',
                }}
              >
                <Button variant='outlined' color='info' type='submit'>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </form>
  );
};

export default UserInfo;
