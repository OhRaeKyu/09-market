import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';

import GoBackHeader from '@/components/GoBackHeader';

export default function PasswordModify() {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.userData.email);

  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const modifyVerify = () => {
    if (
      error.length === 0 &&
      password.length > 0 &&
      passwordVerify.length > 0
    ) {
      setError('');
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value === passwordVerify) {
      setError('');
    } else {
      setError('비밀번호가 일지하지 않습니다.');
    }
  };

  const handleInputVerify = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVerify(e.target.value);

    if (e.target.value === password) {
      setError('');
    } else {
      setError('비밀번호가 일지하지 않습니다.');
    }
  };

  const handleModifyBtn = async (data: { password: string }, email: string) => {
    const userId = sessionStorage.getItem('userId');

    if (email === 'test@test.com') {
      navigate(-1);
      window.alert('테스트 계정은 비밀번호를 변경할 수 없습니다.');
    } else {
      await axios
        .put(`/auth/${userId}/update`, data)
        .then(() => {
          navigate(`/profile/detail/${userId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <GoBackHeader headerTitle="비밀번호 변경" />
      <FormWrap>
        <Form method="get">
          <label htmlFor="inpPassword">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            id="inpPassword"
            required
            value={password}
            onChange={handleInputPassword}
            onKeyUp={modifyVerify}
          />
          <label htmlFor="inpMobile">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            id="inpMobile"
            required
            value={passwordVerify}
            onChange={handleInputVerify}
            onKeyUp={modifyVerify}
          />
        </Form>
        <ModifyButton
          type="button"
          onClick={() => handleModifyBtn({ password: password }, userEmail)}
          disabled={disabledBtn}
        >
          수정하기
        </ModifyButton>
      </FormWrap>
    </>
  );
}

const FormWrap = styled.main`
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
  width: 80vw;

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

const ModifyButton = styled.button`
  width: 80%;
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  padding: 15px 0;

  &:disabled {
    cursor: inherit;
    opacity: 0.5;
  }
`;
