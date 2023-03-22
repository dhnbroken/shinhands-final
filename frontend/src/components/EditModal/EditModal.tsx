import { Modal, Box, Typography, Button, Stack, Grid, FormHelperText } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { IUser } from '~/store/interface';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { updateUser } from '~/API/user';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '~/redux/hooks';
import { updateUser } from '~/redux/actions/userActions';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { useSelector } from 'react-redux';
import axios from 'axios';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditModal: React.FC<Props> = (props) => {
  const { setLoading } = useContext(GlobalContextProvider);
  const { open, setOpen, loading, userInfo, setUserInfo } = props;
  const [fileChosen, setFileChosen] = useState('');
  const [avatar, setAvatar] = useState<any>('');
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setFileChosen(URL.createObjectURL(img));
      setAvatar(img);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserInfo({});
  };
  const accessToken = sessionStorage.getItem('accessToken');

  const { register, handleSubmit } = useForm<IFormInput>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (avatar) {
      const imageData = new FormData();
      const fileName = Date.now() + avatar.name;
      imageData.append('name', fileName);
      imageData.append('file', avatar);
      try {
        axios.post('http://localhost:8000/upload/', imageData);
      } catch (err) {
        console.log(err);
      }
      if (data) {
        const updateData: IUser = {
          email: data.email,
          password: data.password,
          avatar: fileName,
        };
        !!accessToken &&
          !!userInfo._id &&
          dispatch(updateUser(updateData, accessToken, userInfo._id)).then(() => {
            setLoading(true);
            handleClose();
          });
      }
    }
  };
  const { user } = useSelector((state: any) => state.userReducer);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h5' component='h2'>
          Update account information
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className='col-md-8 col-lg-6 col-xl-5 text-center'>
                  <img
                    src={import.meta.env.VITE_PUBLIC_IMAGE_URL + user?.avatar || fileChosen}
                    className='img-fluid'
                    width='150'
                    alt='...'
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='email-login'>Email</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id='-email-login'
                    type='email'
                    {...register('email')}
                    name='email'
                    defaultValue={user?.email}
                  />
                  <FormHelperText
                    error
                    id='standard-weight-helper-text-password-login'
                  ></FormHelperText>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <div className='form-outline mb-3'>
                  <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    id='form3Example4'
                    className='form-control form-control-lg'
                    placeholder='Image'
                    {...register('image')}
                    onChange={onImageChange}
                  />
                  <p className='text-danger'>{!avatar && 'Please choose Image'}</p>
                </div>
              </Grid>

              <Grid item xs={12}>
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    disableElevation
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{
                      backgroundColor: '#1890ff',
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      fontWeight: '400',
                    }}
                  >
                    Save
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default EditModal;
