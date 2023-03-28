import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import FormControl from '@mui/material/FormControl';
import { strengthColor, strengthIndicator } from '../../utils/password-strength';
import { useAppDispatch } from '~/redux/hooks';
import { signup } from '~/redux/actions/auth';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required(),
    email: yup.string().email().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState<any>();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setPassword(value);
    setLevel(strengthColor(temp));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    if (data.confirmPassword === data.password) {
      try {
        await dispatch(signup(data.username, data.password, data.email));
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    }
    resetField('username');
    resetField('email');
    resetField('password');
    resetField('confirmPassword');
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ maxWidth: { xs: '400px', md: '475px' }, width: '475px' }}>
        <Box padding='40px'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack alignItems='baseline' flexDirection='row' justifyContent='space-between'>
                <Typography variant='h3' sx={{ fontSize: '1.5rem' }}>
                  Register
                </Typography>
                <Typography
                  component={Link}
                  to='/login'
                  variant='body1'
                  sx={{ textDecoration: 'none' }}
                  color='primary'
                >
                  Already have an account?
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor='username-login'>Username</InputLabel>
                      <OutlinedInput
                        id='username-login'
                        type='text'
                        placeholder='Enter username'
                        fullWidth
                        {...register('username')}
                      />
                      <FormHelperText error id='standard-weight-helper-text-email-login'>
                        {errors.username?.message}
                      </FormHelperText>
                    </Stack>
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
                        placeholder='Enter email address'
                      />
                      <FormHelperText error id='standard-weight-helper-text-password-login'>
                        {errors.password?.message}
                      </FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor='password-login'>Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id='password-login'
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        name='password'
                        autoComplete='on'
                        value={password}
                        onChange={(e) => changePassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              edge='end'
                              size='large'
                            >
                              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder='Enter password'
                      />
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems='center'>
                          <Grid item>
                            <Box
                              sx={{
                                bgcolor: level?.color,
                                width: 85,
                                height: 8,
                                borderRadius: '7px',
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant='subtitle1' fontSize='0.75rem'>
                              {level?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </FormControl>
                      <FormHelperText error id='standard-weight-helper-text-password-login'>
                        {errors.password?.message}
                      </FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor='confirm-password-login'>Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id='confirm-password-login'
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        name='confirmPassword'
                        autoComplete='on'
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfirmPassword}
                              edge='end'
                              size='large'
                            >
                              {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder='Enter password'
                      />
                      <FormHelperText error id='standard-weight-helper-text-password-login'>
                        {errors.password?.message}
                      </FormHelperText>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                      spacing={2}
                    >
                      <Typography variant='body2' fontSize='12px'>
                        By Signing up, you agree to our Terms of Service and Privacy Policy
                      </Typography>
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
                        Create Account
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
