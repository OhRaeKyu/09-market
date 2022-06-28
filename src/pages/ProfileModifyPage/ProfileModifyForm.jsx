import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PALLETS } from 'utils/constants';
import axios from '../../api/axios';

export default function ProfileModifyForm() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [inputPw, setInputPw] = useState('');
  const [inputPwVerify, setInputPwVerify] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputZipcode, setInputZipcode] = useState(0);

  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const [userData, setUserData] = useState({
    password: '',
    nickname: '',
    mobile: '',
    address: '',
    zipcode: 0,
  });

  const handleUserData = (key, value) => {
    setUserData((prevObject) => ({ ...prevObject, [key]: value }));
  };

  useEffect(() => {
    if (
      error.length === 0 &&
      inputPw.length > 0 &&
      inputPwVerify.length > 0 &&
      inputPw === inputPwVerify &&
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
  }, [
    error,
    inputPw,
    inputPwVerify,
    inputName,
    inputPhone,
    inputAddress,
    inputZipcode,
  ]);

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleInputPwVerify = (e) => {
    setInputPwVerify(e.target.value);

    if (e.target.value === inputPw) {
      setError('');
      handleUserData('password', e.target.value);
    } else {
      setError('비밀번호가 일지하지 않습니다.');
    }
  };

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

  const handleNextBtn = async (userData) => {
    const data = {
      password: userData.password,
      nickname: userData.nickname,
      mobile: userData.mobile,
      address: userData.address,
      zipcode: userData.zipcode,
    };

    await axios
      .put(`/auth/${userId}/update`, data)
      .then((res) => {
        console.log(res);
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
          value={inputPw}
          onChange={handleInputPw}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          required
          value={inputPwVerify}
          onChange={handleInputPwVerify}
        />
        <label>사용자 이름</label>
        <input
          type="text"
          placeholder="사용자 이름 입력"
          required
          value={inputName}
          onChange={handleInputName}
        />
        <label>전화번호</label>
        <input
          type="number"
          placeholder="- 를 제외하고 숫자만 입력해주세요."
          required
          value={inputPhone}
          onChange={handleInputPhone}
        />
        <label>주소(수정 예정)</label>
        <input
          type="text"
          placeholder="주소 입력"
          required
          value={inputAddress}
          onChange={handleInputAddress}
        />
        <label>우편번호(수정 예정)</label>
        <input
          type="text"
          placeholder="우편번호 입력"
          required
          value={inputZipcode}
          onChange={handleInputZipcode}
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
