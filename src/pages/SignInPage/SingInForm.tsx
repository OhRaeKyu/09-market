import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';

interface SignInUserData {
  email: string;
  password: string;
}

export default function SingInForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<SignInUserData>({
    email: '',
    password: '',
  });

  const pressEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignInBtn(userData);
    }
  };

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handleInputPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleSignInBtn = async (userData: SignInUserData) => {
    await axios
      .post('/auth/signin', userData)
      .then((res) => {
        const { token, userId } = res.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);

        navigate('/');
      })
      .catch(() => {
        window.alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      });
  };

  return (
    <Form method="post">
      <label className="blind">아이디 입력</label>
      <input
        type="text"
        required
        placeholder="아이디 입력"
        value={userData.email}
        onChange={handleInputEmail}
      />
      <label className="blind">비밀번호 입력</label>
      <input
        type="password"
        required
        placeholder="비밀번호 입력"
        value={userData.password}
        onChange={handleInputPw}
        onKeyUp={pressEnterKey}
      />
      <SignInButton type="button" onClick={() => handleSignInBtn(userData)}>
        로그인
      </SignInButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 20px 10px;

  input {
    border: 1px solid ${PALLETS.LIGHT_GRAY};
    padding: 10px;
    margin-bottom: 10px;
  }
`;

const SignInButton = styled.button`
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  padding: 15px 0;
`;
