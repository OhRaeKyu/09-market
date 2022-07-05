import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import axios from '@/api/axios';
import { isLogined } from '@/utils/isLogined';

import GoBackHeader from '@/components/GoBackHeader';
import ItemUploadForm from './ItemUploadForm';

export default function ItemUploadPage() {
  const navigate = useNavigate();

  const getUserData = async () => {
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('token');

    await axios
      .get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          sessionStorage.clear();
          navigate('/signin');
        }
      });
  };

  useEffect(() => {
    if (isLogined()) {
      getUserData();
    }
  }, []);

  if (isLogined()) {
    return (
      <>
        <GoBackHeader headerTitle="새 게시물" />
        <ItemUploadForm />
      </>
    );
  } else {
    return <Navigate replace to="/signin" />;
  }
}
