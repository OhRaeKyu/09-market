import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { setImgSrc } from '@/utils/setImgSrc';

import profileSrc from '@/images/profileImg.png';

export default function WriterProfile() {
  const userId = useSelector((state) => state.itemDetail.userId);
  const [writerImgUrl, setWriterImgUrl] = useState('');
  const [writerName, setWriterName] = useState('');

  const getWriterProfile = async () => {
    const userToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    await axios
      .get(`/user/${userId}`, { headers })
      .then((res) => {
        const { userImageUrl, nickname } = res.data;
        setWriterImgUrl(userImageUrl);
        setWriterName(nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWriterProfile();
  }, []);

  const profileImgSrc = (url: string | null) => {
    if (!url) {
      return profileSrc;
    } else {
      return setImgSrc(url);
    }
  };

  return (
    <PostAuthorWrap to={`/profile/detail/${userId}`}>
      <AuthorImage
        src={profileImgSrc(writerImgUrl)}
        alt={`${writerName}의 프로필 이미지`}
      />
      <AuthorName>{writerName}</AuthorName>
    </PostAuthorWrap>
  );
}

const PostAuthorWrap = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const AuthorName = styled.p`
  font-weight: 800;
`;
