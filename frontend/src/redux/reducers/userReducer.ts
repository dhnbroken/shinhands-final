import {
  GETUSER_START,
  GETUSER_SUCCESS,
  GETUSER_FAIL,
  GETUSERS_START,
  GETUSERS_SUCCESS,
  GETUSERS_FAIL,
  CLEAR_USERS,
  UPDATE_SUCCESS,
  UPDATE_ADMIN_SUCCESS,
} from './../actions/types';

const initialState = { isLoggedIn: false, user: null, users: null };

export default function (state = initialState, action: any) {
  const { type, data } = action;

  switch (type) {
    case GETUSERS_START:
      return { ...state };
    case GETUSERS_SUCCESS:
      return { ...state, users: data };
    case GETUSERS_FAIL:
      return { ...state, error: true };
    case GETUSER_START:
      return { ...state };
    case GETUSER_SUCCESS:
      return {
        ...state,
        user: data,
      };
    case GETUSER_FAIL:
      return { ...state, loading: false, error: true };
    case CLEAR_USERS:
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('isAdmin');
      return { ...state, users: null, user: null };
    case UPDATE_SUCCESS:
      return {
        ...state,
        user: data,
      };
    case UPDATE_ADMIN_SUCCESS:
      return { ...state };
    default:
      return state;
  }
}
