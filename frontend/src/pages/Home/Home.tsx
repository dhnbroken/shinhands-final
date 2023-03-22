// import { Typography } from '@mui/material';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PaginatedItems from '~/components/PaginatedItem/PaginatedItem';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { useAppDispatch } from '~/redux/hooks';
import { IUser } from '~/store/interface';
import { getAllUsers, getUserInfo } from '~/redux/actions/userActions';

const Home: React.FC = () => {
  const { setUsers, setLoading, loading } = useContext(GlobalContextProvider);
  const [loadingComponent, setLoadingComponent] = useState(true);
  const dispatch = useAppDispatch();

  const { users } = useSelector((state: any) => state.userReducer);

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem('userId');

    if (accessToken) {
      dispatch(getAllUsers(accessToken)).then(() => {
        setLoading(false);
        setLoadingComponent(false);
      });
      dispatch(getUserInfo(accessToken, userId));
    }
  }, [loading]);

  useEffect(() => {
    setUsers(
      users?.map((user: IUser) => {
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: moment(user.createdAt).format('DD/MM/YYYY'),
          isAdmin: user?.isAdmin ? 'Yes' : 'No',
        };
      }),
    );
  }, [users]);

  return (
    <div>
      <PaginatedItems loadingComponent={loadingComponent} />
    </div>
  );
};

export default Home;
