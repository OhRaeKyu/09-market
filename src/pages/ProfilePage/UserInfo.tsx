import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { setImgSrc } from '@/utils/setImgSrc';
import { setUserData } from '@/modules/userModule';

import profileSrc from '@/images/profileImg.png';

export default function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputImgFile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [changeImg, setChangeImg] = useState('');

  const currentUserId = sessionStorage.getItem('userId');
  const profileUserId = useSelector((state) => state.userProfile.userId);
  const authorization = currentUserId == profileUserId;

  const userData = useSelector((state) => state.userData);
  const { nickname, userImageUrl, userInfo } = useSelector(
    (state) => state.userProfile
  );

  const modifyProfileImg = async (imgUrl: string) => {
    const userToken = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    await axios
      .put(`/auth/${userId}/update`, {
        ['userImageUrl']: imgUrl,
      })
      .then(() => {
        console.log('update 성공');
        navigate(`/profile/detail/${userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setChangeImg(
          String(reader.result).replace(/^data:image\/[a-z]+;base64,/, '')
        );
        resolve();
      };
    });
  };

  const handleInputImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      encodeFileToBase64(e.target.files[0]);
    }
  };

  const profileImgSrc = (url: string | null) => {
    if (!url) {
      return profileSrc;
    } else {
      return setImgSrc(url);
    }
  };

  useEffect(() => {
    if (changeImg.length > 0) {
      modifyProfileImg(changeImg);
    }
  }, [changeImg]);

  return (
    <UserInfoWrap>
      <UserInfoHeader>
        <UserProfileImg
          src={profileImgSrc(userImageUrl)}
          alt={`${nickname} 프로필 이미지`}
          onClick={
            authorization ? () => inputImgFile.current.click() : undefined
          }
        />
        <UserNameAndModify>
          <UserName>
            {nickname}
            <span className="blind"> 프로필 페이지</span>
          </UserName>
          {authorization && (
            <ProfileModifyBtn onClick={() => navigate('/profile/modify')}>
              프로필 편집
            </ProfileModifyBtn>
          )}
        </UserNameAndModify>
      </UserInfoHeader>
      <Form className="blind">
        <ImgInput
          type="file"
          accept="image/*"
          onChange={handleInputImg}
          ref={inputImgFile}
        />
      </Form>
    </UserInfoWrap>
  );
}

const UserInfoWrap = styled.section`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const UserInfoHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 320px;

  @media screen and (min-width: 420px) {
    max-width: 700px;
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
  font-size: 1.3rem;
  font-weight: 800;
  text-align: center;
`;

const ProfileModifyBtn = styled.button`
  font-size: 0.75rem;
  margin-top: 1rem;
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Form = styled.form``;

const ImgInput = styled.input``;
