import { IUser } from '~/store/interface';
import * as userApi from '../../API/user';

export const getUserInfo =
  (accessToken: string | null, userId: string | null) => async (dispatch: any) => {
    dispatch({ type: 'GETUSER_START' });
    try {
      const res = await userApi.getUserInfo(accessToken, userId);
      dispatch({ type: 'GETUSER_SUCCESS', data: res });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'GETUSER_FAIL' });
    }
  };

export const getAllUsers = (accessToken: string | null) => async (dispatch: any) => {
  dispatch({ type: 'GETUSERS_START' });
  try {
    const res = await userApi.getAllUsers(accessToken);
    dispatch({ type: 'GETUSERS_SUCCESS', data: res });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'GETUSERS_FAIL' });
  }
};

export const updateUser =
  (data: IUser, accessToken: string | null, userId: string | null) => async (dispatch: any) => {
    try {
      const res = await userApi.updateUser(data, accessToken, userId);
      dispatch({ type: 'UPDATE_SUCCESS', data: res });
    } catch (err) {
      console.error(err);
    }
  };
