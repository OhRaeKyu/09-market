import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { setUserData } from '@/modules/userModule';

import GoBackHeader from '@/components/GoBackHeader';

export default function ProfileModifyPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { email, nickname, mobile } = useSelector((state) => state.userData);

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
        setLoading(false);
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
      <GoBackHeader headerTitle="프로필 편집" />
      <ModifyListWrap>
        <ModifyList>
          <ModifyItem>
            <ModifyLink to={'/profile/modify/user'}>
              회원 정보
              <UserEmail>{email}</UserEmail>
            </ModifyLink>
            <UserInfoWrap>
              <UserInfoList>
                <UserInfoTerm>이름</UserInfoTerm>
                <UserInfoDetail>{nickname}</UserInfoDetail>
              </UserInfoList>
              <UserInfoList>
                <UserInfoTerm>전화번호</UserInfoTerm>
                <UserInfoDetail>{mobile}</UserInfoDetail>
              </UserInfoList>
            </UserInfoWrap>
          </ModifyItem>
          <ModifyItem>
            <ModifyLink to={'/profile/modify/password'}>
              비밀번호 변경
            </ModifyLink>
          </ModifyItem>
          <ModifyItem>
            <ModifyLink to={'/profile/modify/address'}>주소지 변경</ModifyLink>
          </ModifyItem>
        </ModifyList>
      </ModifyListWrap>
    </>
  );
}
const ModifyListWrap = styled.main`
  margin-top: 70px;
`;

const ModifyList = styled.ul``;

const ModifyItem = styled.li`
  padding: 15px 0;
  margin: 0 auto;
  width: 90vw;

  @media screen and (min-width: 420px) {
    width: 70vw;
  }
`;

const ModifyLink = styled(Link)`
  position: relative;
  display: block;

  height: 2rem;
  line-height: 2rem;
  font-size: 1.2rem;

  &::after {
    content: '>';
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;

const UserEmail = styled.span`
  position: absolute;
  top: 50%;
  left: 5.5rem;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.6);
  font-size: 1rem;
`;

const UserInfoWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 10px 0;
  padding-left: 0.5rem;
`;

const UserInfoList = styled.dl`
  display: flex;

  &:nth-child(2n + 1) {
    width: 120px;

    dt {
      width: 2rem;
    }

    dd {
      width: 4rem;
    }
  }
`;

const UserInfoTerm = styled.dt`
  margin-right: 1rem;
`;

const UserInfoDetail = styled.dd`
  color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
