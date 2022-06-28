import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { PALLETS } from 'utils/constants';

import AddressModal from './AddressModal';

export default function PersonalInformation({ userData, handleUserData }) {
  const navigate = useNavigate();

  const [addressClicked, setAddressClicked] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputZipcode, setInputZipcode] = useState(0);

  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (
      error.length === 0 &&
      inputName.length > 0 &&
      inputPhone.length > 0 &&
      inputAddress.length > 0 &&
      inputZipcode.length > 0
    ) {
      setError('');
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [error, inputName, inputPhone, inputAddress, inputZipcode]);

  const handleInputName = (e) => {
    setInputName(e.target.value);
    handleUserData('nickname', e.target.value);
  };

  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);

    const checkPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (checkPhone.test(e.target.value)) {
      setError('');
      handleUserData('mobile', e.target.value);
    } else {
      setError('전화번호 형식이 유효하지 않습니다.');
    }
  };

  const handleInputAddress = (e) => {
    setInputAddress(e.target.value);
    handleUserData('address', e.target.value);
  };

  const handleInputZipcode = (e) => {
    setInputZipcode(e.target.value);
    handleUserData('zipcode', e.target.value);
  };

  const signUp = async (userData) => {
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
            value={inputName}
            onChange={handleInputName}
            className="mb-25"
          />
          <label htmlFor="inpPhone">전화번호</label>
          <input
            type="number"
            placeholder="- 를 제외하고 숫자만 입력해주세요."
            required
            id="inpPhone"
            value={inputPhone}
            onChange={handleInputPhone}
            className="mb-25"
          />
          <label htmlFor="inpAddress">주소(수정 예정)</label>
          <input
            type="text"
            placeholder="주소 입력"
            required
            id="inpAddress"
            value={inputAddress}
            onChange={handleInputAddress}
            className="mb-25"
          />
          <label htmlFor="inpZipcode">우편번호(수정 예정)</label>
          <input
            type="text"
            placeholder="우편번호 입력"
            required
            id="inpZipcode"
            maxlength="5"
            value={inputZipcode}
            onChange={handleInputZipcode}
            className="mb-25"
          />
          {/* <button type="button" onClick={() => setAddressClicked(true)}>
            주소검색
          </button> */}
          <ErrorText>{error}</ErrorText>
        </Form>
        {addressClicked && <AddressModal />}

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

  .mb-25 {
    margin-bottom: 25px;
  }

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
