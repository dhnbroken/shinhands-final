import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers, getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';

import PaginatedItems from '~/components/PaginatedItem/PaginatedItem';
import moment from 'moment';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { IUser } from '~/store/interface';

const User: React.FC = () => {
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
      users?.map((user: IUser, index: number) => {
        return {
          ...user,
          createdAt: moment(user.createdAt).format('DD/MM/YYYY'),
          id: user._id,
          index: index + 1,
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

export default User;
