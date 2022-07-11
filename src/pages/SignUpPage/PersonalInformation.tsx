import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { InitUserData, setUserData } from '@/modules/userModule';

import AddressModal from '@/components/AddressModal';

export default function PersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const { nickname, mobile, address, zipcode } = userData;

  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [addressDetail, setAddressDetail] = useState('');

  const signUpVerify = () => {
    if (
      error.length === 0 &&
      nickname.length > 0 &&
      mobile.length > 0 &&
      zipcode.length > 0 &&
      address.length > 0 &&
      addressDetail.length > 0
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
    dispatch(setUserData({ mobile: e.target.value }));

    const checkPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (checkPhone.test(e.target.value)) {
      setError('');
    } else {
      setError('전화번호 형식이 유효하지 않습니다.');
    }
  };

  const handleInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const signUp = async (data: InitUserData) => {
    const detail = addressDetail;
    const userData = {
      ...data,
      address: data.address.concat(' ', detail),
    };

    await axios
      .post('/auth/signup', userData)
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
          <AddressWrap>
            <legend className="blind">주소 Form</legend>
            <label htmlFor="inpAddress">주소</label>
            <AddressSearchBtn
              id="inpAddress"
              type="button"
              onClick={() => setModal(true)}
            >
              주소찾기
            </AddressSearchBtn>
            <input
              type="text"
              placeholder="우편번호"
              value={zipcode}
              readOnly
            />
            <input type="text" placeholder="주소" value={address} readOnly />
            <input
              type="text"
              placeholder="상세 주소"
              required
              value={addressDetail}
              onChange={handleInputAddress}
              onKeyUp={signUpVerify}
            />
          </AddressWrap>
          <ErrorText>{error}</ErrorText>
        </Form>
        <SignUpButton
          type="button"
          disabled={disabledBtn}
          onClick={handleSignUpBtn}
        >
          가입하기
        </SignUpButton>
        {modal && <AddressModal setModal={setModal} />}
      </SignUpPageWrap>
    </>
  );
}

const SignUpPageWrap = styled.main`
  postion: relative;
  height: 100vh;
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
  width: 80vw;
  max-width: 800px;
  margin-bottom: 15px;

  input {
    border: 1px solid ${PALLETS.LIGHT_GRAY};
    padding: 10px;
    margin-bottom: 10px;
  }

  label {
    margin: 0 0 5px 10px;
  }
`;

const AddressWrap = styled.fieldset`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AddressSearchBtn = styled.button`
  box-sizing: border-box;
  position: absolute;
  top: 30px;
  right: 10px;
  width: 5rem;
  height: 1.5rem;
  background-color: ${PALLETS.LIGHT_GRAY};
  border-radius: 3px;
`;

const ErrorText = styled.strong`
  position: absolute;
  bottom: -10px;
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

const SignUpButton = styled.button`
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  padding: 15px 0;
  width: 80vw;
  max-width: 800px;

  &:disabled {
    cursor: inherit;
    opacity: 0.5;
  }
`;
