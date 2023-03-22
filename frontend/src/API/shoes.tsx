import { ISneakerData } from '~/store/interface';
import { axiosInstance } from './axiosInstance';

export const addShoes = async ({ name, price, image, description }: ISneakerData) => {
  return await axiosInstance.post('/v1/shoes/', { name, price, image, description });
};
