import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';

const UserInfo = () => {
  const { user } = useSelector((state: any) => state.userReducer);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem('userId');
    dispatch(getUserInfo(accessToken, userId));
  }, []);
  console.log(user);
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          //   height: '100%',
        },
      }}
    >
      <Paper elevation={3}>
        <Grid container>
          <Grid item xs={5} padding={5}>
            <Card sx={{ width: '100%', boxShadow: 'none' }}>
              <CardMedia
                component='img'
                height='200'
                image='https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=500w'
                alt='green iguana'
                sx={{ objectFit: 'contain' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant='h5' component='div'>
                  {user?.username}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={7} padding={5}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    placeholder='First Name'
                    label='Firstname'
                    variant='outlined'
                    fullWidth
                    defaultValue={user?.firstname}
                    className='user_textfield'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size='medium'
                    variant='outlined'
                    fullWidth
                    label='Lastname'
                    sx={{ height: '1.4375em !important' }}
                    className='user_textfield'
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserInfo;
