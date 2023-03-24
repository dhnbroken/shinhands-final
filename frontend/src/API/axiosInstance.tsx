import axios from 'axios';
import { toast } from 'react-toastify';
import { toastConfig } from '~/utils/toastConfig';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

export const axiosAction = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw new Error(error);
  },
);

axiosAction.interceptors.response.use(
  (response) => {
    toast.success('Success!', toastConfig);
    return response;
  },
  (error) => {
    toast.error(
      error.response.status === 500 ? 'Error, please try again' : error.response.data,
      toastConfig,
    );
    throw new Error(error);
  },
);
