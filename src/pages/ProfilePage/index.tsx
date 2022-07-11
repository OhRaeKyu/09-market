import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import UserInfo from './UserInfo';
import ItemsInfo from './ItemsInfo';
import OptionModal from '@/components/OptionModal';

import { isLogined } from '@/utils/isLogined';
import axios from '@/api/axios';
import { setUserProfile } from '@/modules/userModule';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useParams().userId;
  const [loading, setLoading] = useState(true);
  const storedId = useSelector((state) => state.userProfile.userId);
  const { modalOpen } = useSelector((state) => state.isModalOpen);

  const getUserProfile = async (userId: string) => {
    const userToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    await axios
      .get(`/user/${userId}`, { headers })
      .then((res) => {
        dispatch(
          setUserProfile({ ...res.data, userId: String(res.data.userId) })
        );
        setLoading(false);
      })
      .catch(() => {
        sessionStorage.clear();
        navigate('/signin');
      });
  };

  useEffect(() => {
    if (isLogined() && !!userId) {
      if (userId !== storedId) {
        getUserProfile(userId);
      } else {
        setLoading(false);
      }
    }
  }, []);

  if (isLogined() && !loading) {
    return (
      <>
        <UserInfo />
        <ItemsInfo />
        {!!modalOpen && <OptionModal />}
      </>
    );
  } else if (isLogined() && loading) {
    return <></>;
  } else {
    return <Navigate replace to="/signin" />;
  }
}
