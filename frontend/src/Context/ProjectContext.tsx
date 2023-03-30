import { userInitial } from '~/store/constants';

/* eslint-disable @typescript-eslint/no-empty-function */
export const ProjectContext = {
  loading: false,
  setLoading: () => {},
  loadingComponent: false,
  setLoadingComponent: () => {},
  users: [],
  setUsers: () => {},
  user: userInitial,
  setUser: () => {},
  accessToken: '',
  setAccessToken: () => {},
  userId: '',
  setUserId: () => {},
};
