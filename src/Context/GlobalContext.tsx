import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { IUser } from '~/store/interface';
import { ProjectContext } from './ProjectContext';

interface GlobalContext {
  loading: boolean;
  setLoading: (value: boolean) => void;
  users: IUser[];
  setUsers: (users: IUser[]) => void;
  user: IUser;
  setUser: (user: IUser) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

interface PropsProvider {
  children: React.ReactNode;
}

export const GlobalContextProvider = React.createContext<GlobalContext>(ProjectContext);
export const GlobalStoreContext = ({ children }: PropsProvider) => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>(ProjectContext.user);

  const [accessToken, setAccessToken] = useState<string | null>(
    sessionStorage.getItem('accessToken'),
  );
  const [userId, setUserId] = useState<string | null>(sessionStorage.getItem('userId'));

  const valueContext = {
    loading,
    setLoading,
    users,
    setUsers,
    user,
    setUser,
    accessToken,
    setAccessToken,
    userId,
    setUserId,
  };
  return (
    <GlobalContextProvider.Provider value={valueContext}>{children}</GlobalContextProvider.Provider>
  );
};
