import { useEffect } from 'react';
import GoBackHeader from '@/components/GoBackHeader';
import ProfileModifyForm from './ProfileModifyForm';
import { useDispatch } from 'react-redux';

import axios from '@/api/axios';
import { setUserData } from '@/modules/userModule';

export default function ProfileModifyPage() {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const userToken = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    await axios
      .get(`/auth/${userId}/update`, { headers })
      .then((res) => {
        dispatch(setUserData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <GoBackHeader headerTitle="프로필 수정" />
      <ProfileModifyForm />
    </>
  );
}
