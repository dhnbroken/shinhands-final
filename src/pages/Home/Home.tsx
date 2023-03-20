// import { Typography } from '@mui/material';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { getAllUsers, getUserInfo } from '~/API/user';
import PaginatedItems from '~/components/PaginatedItem/PaginatedItem';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { IUser } from '~/store/interface';

const Home: React.FC = () => {
  const { setAccessToken, setUserId, setUsers, setLoading, setUser, loading } =
    useContext(GlobalContextProvider);
  const [loadingComponent, setLoadingComponent] = useState(true);

  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');
  const getUsers = async (accessToken: string | null) => {
    try {
      const res = await getAllUsers(accessToken);
      setLoading(false);
      setLoadingComponent(false);
      setUsers(
        res.map((user: IUser) => {
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: moment(user.createdAt).format('DD/MM/YYYY'),
            isAdmin: user.isAdmin ? 'Yes' : 'No',
          };
        }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async (accessToken: string | null, id: string | null) => {
    try {
      const res = await getUserInfo(accessToken, id);
      setUser(res);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'));
    setUserId(sessionStorage.getItem('userId'));
  }, []);

  React.useEffect(() => {
    getUsers(accessToken);
    getUser(accessToken, userId);
  }, [loading]);

  return (
    <div>
      <PaginatedItems loadingComponent={loadingComponent} getUsers={getUsers} getUser={getUser} />
    </div>
  );
};

export default Home;
