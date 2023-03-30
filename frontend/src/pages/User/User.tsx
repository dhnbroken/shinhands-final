import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import PaginatedItems from '~/components/PaginatedItem/PaginatedItem';
import moment from 'moment';
import { GlobalContextProvider } from '~/Context/GlobalContext';
import { IUser } from '~/store/interface';

const User: React.FC = () => {
  const { setUsers, loadingComponent } = useContext(GlobalContextProvider);

  const { users } = useSelector((state: any) => state.userReducer);

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
