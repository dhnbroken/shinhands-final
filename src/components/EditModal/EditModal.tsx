import { Modal, Box, Typography, Button, Stack, Grid, FormHelperText } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { motion } from 'framer-motion';
import React from 'react';
import { IUser } from '~/store/interface';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateUser } from '~/API/user';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  userInfo: IUser;
  getUsers: (accessToken: string | null) => Promise<void>;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
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
  const { open, setOpen, loading, getUsers, userInfo, setUserInfo } = props;

  const handleClose = () => {
    setOpen(false);
    setUserInfo({});
  };
  const accessToken = sessionStorage.getItem('accessToken');

  const { register, handleSubmit } = useForm<IFormInput>();

  const updateUserInfo = async (data: IUser, accessToken: string | null, userId: string | null) => {
    try {
      await updateUser(data, accessToken, userId);
      getUsers(accessToken);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data) {
      const updateData: IUser = {
        email: data.email,
        password: data.password,
      };
      !!accessToken && !!userInfo._id && updateUserInfo(updateData, accessToken, userInfo._id);
    }
    console.log(data);
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='email-login'>Email</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id='-email-login'
                    type='email'
                    {...register('email')}
                    name='email'
                    placeholder={userInfo.email}
                  />
                  <FormHelperText
                    error
                    id='standard-weight-helper-text-password-login'
                  ></FormHelperText>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='password-update'>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id='password-update'
                    type='password'
                    {...register('password')}
                    name='password'
                    // placeholder={userInfo.email}
                  />
                  <FormHelperText
                    error
                    id='standard-weight-helper-text-password-login'
                  ></FormHelperText>
                </Stack>
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
