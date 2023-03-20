import axios from 'axios';

export const axiosInstance = axios.create({
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
