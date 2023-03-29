import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
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
import { login } from '~/redux/actions/auth';
import { useAppDispatch } from '~/redux/hooks';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useAppDispatch();

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
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(login(data.username, data.password));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
    resetField('username');
    resetField('password');
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ maxWidth: { xs: '475px', md: '400px' }, width: '475px' }}>
        <Box padding='40px'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack alignItems='baseline' flexDirection='row' justifyContent='space-between'>
                <Typography variant='h3' sx={{ fontSize: '1.5rem' }}>
                  Login
                </Typography>
                <Typography
                  component={Link}
                  to='/register'
                  variant='body1'
                  sx={{ textDecoration: 'none' }}
                  color='primary'
                >
                  Don&apos;t have an account?
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor='email-login'>Username</InputLabel>
                      <OutlinedInput
                        id='email-login'
                        type='text'
                        placeholder='Enter email address'
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
                      <InputLabel htmlFor='password-login'>Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id='-password-login'
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        name='password'
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name='checked'
                            color='primary'
                            size='small'
                          />
                        }
                        label={<Typography variant='h6'>Keep me sign in</Typography>}
                      />
                      {/* <Link variant='h6' component={RouterLink} to='' color='text.primary'>
                                    Forgot Password?
                                  </Link> */}
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
                        Login
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

export default Login;
