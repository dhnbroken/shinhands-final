import { ISneakerData } from '~/store/interface';
import { axiosAction, axiosInstance } from './axiosInstance';

export const getAllShoes = async () => {
  const res = await axiosInstance.get('/v1/shoes/');
  return res.data;
};

export const addShoes = async (data: ISneakerData, accessToken: string | null) => {
  return await axiosAction.post('/v1/shoes/', data, {
    headers: { token: `Bearer ${accessToken}` },
  });
};

export const getShoesData = async (id: string | undefined) => {
  const res = await axiosInstance.get(`/v1/shoes/${id}`);
  return res.data;
};

export const updateShoesData = async (
  data: ISneakerData,
  accessToken: string | null,
  id: string | undefined,
) => {
  const res = await axiosAction.put(`/v1/shoes/${id}`, data, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const deleteShoes = async (accessToken: string | null, id: string | undefined) => {
  return await axiosAction.delete(`/v1/shoes/${id}`, {
    headers: { token: `Bearer ${accessToken}` },
  });
};
