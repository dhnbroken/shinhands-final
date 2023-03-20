import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers, getUserInfo } from '~/redux/actions/userActions';
import { useAppDispatch } from '~/redux/hooks';

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    dispatch(getAllUsers(accessToken));
  }, []);

  return (
    <div>
      <div>user</div>
    </div>
  );
};

export default User;
