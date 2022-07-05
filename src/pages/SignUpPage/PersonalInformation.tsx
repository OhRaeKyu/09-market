import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { InitUserData, setUserData } from '@/modules/userModule';

export default function PersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const { nickname, mobile, address, zipcode } = userData;

  const [addressClicked, setAddressClicked] = useState(false);

  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const signUpVerify = () => {
    if (
      error.length === 0 &&
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

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserData({ nickname: e.target.value }));
  };

  const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    dispatch(setUserData({ mobile: e.target.value }));

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

  const signUp = async (userData: InitUserData) => {
    const data = {
      email: userData.email,
      password: userData.password,
      nickname: userData.nickname,
      mobile: userData.mobile,
      address: userData.address,
      zipcode: userData.zipcode,
    };
    await axios
      .post('/auth/signup', data)
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => console.log(err));
  };

  const handleSignUpBtn = () => {
    signUp(userData);
  };

  return (
    <>
      <SignUpPageWrap>
        <Form method="get">
          <label htmlFor="inpName">사용자 이름</label>
          <input
            type="text"
            placeholder="사용자 이름 입력"
            required
            autoFocus
            id="inpName"
            value={nickname}
            onChange={handleInputName}
            onKeyUp={signUpVerify}
          />
          <label htmlFor="inpPhone">전화번호</label>
          <input
            type="number"
            placeholder="- 를 제외하고 숫자만 입력해주세요."
            required
            id="inpPhone"
            value={mobile}
            onChange={handleInputPhone}
            onKeyUp={signUpVerify}
          />
          <label htmlFor="inpAddress">주소(수정 예정)</label>
          <input
            type="text"
            placeholder="주소 입력"
            required
            id="inpAddress"
            value={address}
            onChange={handleInputAddress}
            onKeyUp={signUpVerify}
          />
          <label htmlFor="inpZipcode">우편번호(수정 예정)</label>
          <input
            type="text"
            placeholder="우편번호 입력"
            required
            id="inpZipcode"
            maxLength={5}
            value={zipcode}
            onChange={handleInputZipcode}
            onKeyUp={signUpVerify}
          />
          {/* <button type="button" onClick={() => setAddressClicked(true)}>
            주소검색
          </button> */}
          <ErrorText>{error}</ErrorText>
        </Form>
        <SignUpButton
          type="button"
          disabled={disabledBtn}
          onClick={handleSignUpBtn}
        >
          가입하기
        </SignUpButton>
      </SignUpPageWrap>
    </>
  );
}

const SignUpPageWrap = styled.main`
  height: 100vh;
  max-width: 90vw;
  margin: 0 auto;
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

  input {
    border: 1px solid ${PALLETS.LIGHT_GRAY};
    padding: 10px;
    margin-bottom: 10px;
  }

  label {
    margin: 0 0 5px 10px;
  }
`;

const SignUpButton = styled.button`
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  padding: 15px 0;
  width: 80%;

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
