import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import { PALLETS } from '@/utils/constants';
import axios from '@/api/axios';
import { setUserData, InitUserData } from '@/modules/userModule';

export default function ProfileModifyForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const { password, nickname, mobile, address, zipcode } = userData;

  const [inputPwVerify, setInputPwVerify] = useState('');

  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const modifyVerify = () => {
    if (
      error.length === 0 &&
      password.length > 0 &&
      inputPwVerify.length > 0 &&
      password === inputPwVerify &&
      nickname.length > 0 &&
      mobile.length > 0 &&
      address.length > 0 &&
      zipcode > 0
    ) {
      setError('');
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const handleInputPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserData({ password: e.target.value }));
  };

  const handleInputPwVerify = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPwVerify(e.target.value);

    if (e.target.value === password) {
      setError('');
    } else {
      setError('비밀번호가 일지하지 않습니다.');
    }
  };

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserData({ nickname: e.target.value }));
  };

  const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserData({ mobile: e.target.value }));

    const checkPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (checkPhone.test(e.target.value)) {
      setError('');
    } else {
      setError('전화번호 형식이 유효하지 않습니다.');
    }
  };

  const handleInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserData({ address: e.target.value }));
  };

  const handleInputZipcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserData({ zipcode: e.target.value }));
  };

  const handleNextBtn = async (userData: InitUserData) => {
    const userId = sessionStorage.getItem('userId');

    await axios
      .put(`/auth/${userId}/update`, userData)
      .then((res) => {
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SignUpPageWrap>
      <Form method="get">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          autoFocus
          required
          value={password}
          onChange={handleInputPw}
          onKeyUp={modifyVerify}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          required
          value={inputPwVerify}
          onChange={handleInputPwVerify}
          onKeyUp={modifyVerify}
        />
        <label>사용자 이름</label>
        <input
          type="text"
          placeholder="사용자 이름 입력"
          required
          value={nickname}
          onChange={handleInputName}
          onKeyUp={modifyVerify}
        />
        <label>전화번호</label>
        <input
          type="number"
          placeholder="- 를 제외하고 숫자만 입력해주세요."
          required
          value={mobile}
          onChange={handleInputPhone}
          onKeyUp={modifyVerify}
        />
        <label>주소(수정 예정)</label>
        <input
          type="text"
          placeholder="주소 입력"
          required
          value={address}
          onChange={handleInputAddress}
          onKeyUp={modifyVerify}
        />
        <label>우편번호(수정 예정)</label>
        <input
          type="text"
          placeholder="우편번호 입력"
          required
          value={zipcode}
          onChange={handleInputZipcode}
          onKeyUp={modifyVerify}
        />
        <ErrorText>{error}</ErrorText>
      </Form>
      <NextButton
        type="button"
        onClick={() => handleNextBtn(userData)}
        disabled={disabledBtn}
      >
        수정하기
      </NextButton>
    </SignUpPageWrap>
  );
}
const SignUpPageWrap = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 20px 10px;

  .mb-25 {
    margin-bottom: 25px;
  }

  input {
    border: 1px solid ${PALLETS.LIGHT_GRAY};
    padding: 10px;
    margin-bottom: 20px;
  }

  label {
    margin: 0 0 5px 10px;
  }
`;

const NextButton = styled.button`
  width: 80%;
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  padding: 15px 0;

  &:disabled {
    cursor: inherit;
    opacity: 0.5;
  }
`;

const ErrorText = styled.strong`
  position: absolute;
  bottom: 5px;
  color: rgba(255, 0, 0, 0.7);
  font-size: 0.8rem;
  animation: blink 1s linear infinite alternate;

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
