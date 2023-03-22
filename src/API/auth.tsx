import { axiosAction, axiosInstance } from './axiosInstance';
import { TLoginData, TRegisterData } from '~/store/interface';

export const signin = async ({ username, password }: TLoginData) => {
  return await axiosInstance
    .post('/v1/auth/login', {
      username,
      password,
    })
    .then((res) => {
      if (res.data) {
        sessionStorage.setItem('accessToken', res.data.accessToken);
        sessionStorage.setItem('userId', res.data._id);
        sessionStorage.setItem('isAdmin', res.data.isAdmin);
      }
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const register = async ({ username, password, email }: TRegisterData) => {
  return await axiosAction
    .post('v1/auth/register', {
      username,
      password,
      email,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const signout = async (accessToken: string | null) => {
  return await axiosInstance
    .post('v1/auth/logout', {}, { headers: { token: `Bearer ${accessToken}` } })
    .then(() => {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userId');
    });
};
