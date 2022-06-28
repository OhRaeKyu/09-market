import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { PALLETS } from 'utils/constants';

export default function BasicInformation({ setStep, handleUserData }) {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputPwVerify, setInputPwVerify] = useState('');
  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  let emailVerify = checkEmail.test(inputEmail);

  useEffect(() => {
    if (
      error.length === 0 &&
      inputEmail.length > 0 &&
      inputPw.length > 0 &&
      inputPwVerify.length > 0 &&
      emailVerify &&
      inputPw === inputPwVerify
    ) {
      setError('');
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [error, inputEmail, emailVerify, inputPw, inputPwVerify]);

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);

    if (checkEmail.test(e.target.value)) {
      setError('');
      handleUserData('email', e.target.value);
    } else {
      setError('이메일 형식이 유효하지 않습니다.');
    }
  };

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

  const handleNextBtn = () => {
    setStep('Personal');
  };

  return (
    <SignUpPageWrap>
      <Form method="get">
        <InputEmailWrap className="mb-30">
          <label htmlFor="inpEmail">이메일</label>
          <input
            type="text"
            placeholder="이메일 입력"
            required
            autoFocus
            id="inpEmail"
            value={inputEmail}
            onChange={handleInputEmail}
          />
        </InputEmailWrap>
        <InputPwWrap>
          <label htmlFor="inpPw">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            required
            id="inpPw"
            value={inputPw}
            onChange={handleInputPw}
          />
          <label htmlFor="inpPwVerify">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            required
            id="inpPwVerify"
            value={inputPwVerify}
            onChange={handleInputPwVerify}
          />
        </InputPwWrap>
        <ErrorText>{error}</ErrorText>
      </Form>
      <NextButton type="button" onClick={handleNextBtn} disabled={disabledBtn}>
        다음
      </NextButton>
    </SignUpPageWrap>
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

const InputEmailWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const InputPwWrap = styled(InputEmailWrap)`
  margin-bottom: 0;
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
