import { IUser } from '~/store/interface';
import { axiosInstance } from './axiosInstance';

export const getAllUsers = async (accessToken: string | null) => {
  const res = await axiosInstance.get('/v1/user/', {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const getUserInfo = async (accessToken: string | null, id: string | null) => {
  const res = await axiosInstance.get(`/v1/user/${id}`, {
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const updateUser = async (
  data: IUser,
  accessToken: string | null,
  userId: string | null,
) => {
  const res = await axiosInstance.put(`/v1/user/${userId}/update/`, data, {
    params: { id: userId },
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const deleteUser = async (accessToken: string | null, userId: string | null) => {
  const res = await axiosInstance.delete(`/v1/user/${userId}/delete/`, {
    params: { id: userId },
    headers: { token: `Bearer ${accessToken}` },
  });
  return res.data;
};
