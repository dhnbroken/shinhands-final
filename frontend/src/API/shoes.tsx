import { ISneakerData } from '~/store/interface';
import { axiosInstance } from './axiosInstance';

export const getAllShoes = async () => {
  const res = await axiosInstance.get('/v1/shoes/');
  return res.data;
};

export const addShoes = async ({ name, price, image, description }: ISneakerData) => {
  return await axiosInstance.post('/v1/shoes/', { name, price, image, description });
};

export const getShoesData = async (id: string | undefined) => {
  const res = await axiosInstance.get(`/v1/shoes/${id}`);
  return res.data;
};
