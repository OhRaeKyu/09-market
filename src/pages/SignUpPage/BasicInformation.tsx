import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import { PALLETS } from '@/utils/constants';
import { setUserData } from '@/modules/userModule';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function BasicInformation({ setStep }: Props) {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.userData);

  const [inputPwVerify, setInputPwVerify] = useState('');
  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const emailVerify = checkEmail.test(email);

  const signUpVerify = () => {
    if (
      error.length === 0 &&
      email.length > 0 &&
      password.length > 0 &&
      inputPwVerify.length > 0 &&
      emailVerify &&
      password === inputPwVerify
    ) {
      setError('');
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserData({ email: e.target.value }));

    if (checkEmail.test(e.target.value)) {
      setError('');
    } else {
      setError('이메일 형식이 유효하지 않습니다.');
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
      setError('비밀번호가 일치하지 않습니다.');
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
            value={email}
            onChange={handleInputEmail}
            onKeyUp={signUpVerify}
          />
        </InputEmailWrap>
        <InputPwWrap>
          <label htmlFor="inpPw">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            required
            id="inpPw"
            value={password}
            onChange={handleInputPw}
            onKeyUp={signUpVerify}
          />
          <label htmlFor="inpPwVerify">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            required
            id="inpPwVerify"
            value={inputPwVerify}
            onChange={handleInputPwVerify}
            onKeyUp={signUpVerify}
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
