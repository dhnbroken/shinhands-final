import { updateUser } from './../../API/user';
import { signout } from './../../API/auth';
import { register, signin } from '~/API/auth';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from './types';

import { Dispatch } from '@reduxjs/toolkit';

export const signup =
  (username: string, password: string, email: string) => (dispatch: Dispatch) => {
    return register({ username, password, email }).then(
      (response: any) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data?.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      },
    );
  };

export const login = (username: string, password: string) => async (dispatch: any) => {
  return await signin({ username, password }).then(
    (data: any) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error: any) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    },
  );
};

// export const update = () => {dispatch: any} => {
//   updateUser
// }

// export const logout = () => (dispatch: any) => {
//   signout();

//   dispatch({
//     type: LOGOUT,
//   });
// };
