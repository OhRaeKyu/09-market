import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../api/axios';

import Loading from 'components/Loading';
import { setImgSrc } from 'utils/setImgSrc';
import OptionModal from 'components/OptionModal';

export default function UserInfo() {
  const navigate = useNavigate();
  const userId = useParams().userId;

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [profileImgModify, setProfileImgModify] = useState(false);

  const getUserProfile = useCallback(
    async (profileUserId) => {
      const userToken = localStorage.getItem('token');

      await axios
        .get(`/user/${profileUserId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          setLoading(false);
          setUserName(res.data.nickname);
          setUserImg(res.data.userImageUr);
          setUserInfo(res.data.userInfo);
        })
        .catch((err) => {
          if (err.response.status !== 200) {
            localStorage.clear();
            navigate('/signin');
          }
        });
    },
    [navigate]
  );

  useEffect(() => {
    getUserProfile(userId);
  }, [getUserProfile, userId]);

  const profileImgSrc = (url) => {
    if (!url) {
      return '/images/profileImg.png';
    } else {
      return setImgSrc(url);
    }
  };

  if (!loading) {
    return (
      <UserInfoWrap>
        <UserInfoHeader>
          <UserProfileImg
            src={profileImgSrc(userImg)}
            alt={`${userName} 프로필 이미지`}
            onClick={() => setProfileImgModify(true)}
          />
          <UserNameAndModify>
            <UserName>
              {userName}
              <span className="blind">프로필 페이지</span>
            </UserName>
            <ProfileModifyBtn onClick={() => navigate('/profile/modify')}>
              프로필 편집
            </ProfileModifyBtn>
          </UserNameAndModify>
        </UserInfoHeader>
        {/* <UserInfo */}
        {profileImgModify && (
          <OptionModal
            optionClicked={profileImgModify}
            setOptionClicked={setProfileImgModify}
            mode={'profileImgModify'}
          />
        )}
      </UserInfoWrap>
    );
  } else {
    return <Loading />;
  }
}

const UserInfoWrap = styled.section`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const UserInfoHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 1rem;
  width: 100%;
  max-width: 350px;

  @media screen and (min-width: 420px) {
    max-width: 500px;
  }
`;

const UserProfileImg = styled.img`
  width: 77px;
  height: 77px;
  margin-right: 2rem;
  border-radius: 50%;
  cursor: pointer;

  @media screen and (min-width: 420px) {
    width: 150px;
    height: 150px;
  }
`;

const UserNameAndModify = styled.div`
  width: 100%;
`;

const UserName = styled.h1`
  font-family: 'GmarketSansBold';
  font-size: 1.3rem;
  text-align: center;
`;

const ProfileModifyBtn = styled.button`
  font-size: 0.75rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
