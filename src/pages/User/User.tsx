import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '~/API/user';
import ProfileCard from '~/components/ProfileCard/ProfileCard';
import { IUser } from '~/store/interface';

const User: React.FC = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const [user, setUser] = useState<IUser>();
  const { id } = useParams();
  const getUser = async (accessToken: string | null, id: string | null) => {
    try {
      const res = await getUserInfo(accessToken, id);
      setUser(res);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    id && getUser(accessToken, id);
  }, []);
  return (
    <div>
      <ProfileCard user={user}></ProfileCard>
    </div>
  );
};

export default User;
