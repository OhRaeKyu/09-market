import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import UserInfo from './UserInfo';
import ItemsInfo from './ItemsInfo';
import OptionModal from '@/components/OptionModal';

import { isLogined } from '@/utils/isLogined';
import axios from '@/api/axios';
import { deleteUserData, setUserData } from '@/modules/userModule';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const userId = useParams().userId;
  const modalOpen = useSelector((state) => state.isModalOpen);

  const getUserData = async (userId: string) => {
    const userToken = sessionStorage.getItem('token');

    await axios
      .get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setUserData(res.data));
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          dispatch(deleteUserData());
          sessionStorage.clear();
          navigate('/signin');
        }
      });
  };

  useEffect(() => {
    if (!!userId && isLogined()) {
      getUserData(userId);
    }
  }, [userId]);

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
