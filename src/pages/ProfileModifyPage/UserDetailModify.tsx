import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import {
  setUserData,
  InitUserData,
  setUserProfile,
} from '@/modules/userModule';

import GoBackHeader from '@/components/GoBackHeader';

export default function UserDetailModify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);
  const { nickname, mobile, userInfo } = userData;

  const [info, setInfo] = useState<string>(!!userInfo ? userInfo : '');
  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);

  const modifyVerify = () => {
    if (error.length === 0 && nickname.length > 0 && mobile.length > 0) {
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

  const handleInputInfo = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    dispatch(setUserData({ userInfo: e.target.value }));
    dispatch(setUserProfile({ userInfo: e.target.value }));
  };

  const handelChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxInfoLength = 100;
    if (e.target.value.length > maxInfoLength) {
      window.alert(`${maxInfoLength}자 이상 작성할 수 없습니다.`);
      setInfo(e.target.value.substring(0, 100));
    } else {
      setInfo(e.target.value);
    }
  };

  const handleModifyBtn = async (data: InitUserData) => {
    const userId = sessionStorage.getItem('userId');
    const modifyData = {
      nickname: data.nickname,
      mobile: data.mobile,
      userInfo: data.userInfo,
    };

    await axios
      .put(`/auth/${userId}/update`, modifyData)
      .then(() => {
        navigate(`/profile/detail/${userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <GoBackHeader headerTitle="회원 정보" />
      <SignUpPageWrap>
        <Form method="get">
          <label htmlFor="inpNickname">이름</label>
          <input
            type="text"
            placeholder="이름 입력"
            id="inpNickname"
            required
            value={nickname}
            onChange={handleInputName}
            onKeyUp={modifyVerify}
          />
          <label htmlFor="inpMobile">전화번호</label>
          <input
            type="number"
            placeholder="- 를 제외하고 숫자만 입력해주세요."
            id="inpMobile"
            required
            value={mobile}
            onChange={handleInputPhone}
            onKeyUp={modifyVerify}
          />
          <label htmlFor="inpInfo">소개</label>
          <InputInfo
            id="inpInfo"
            value={info}
            placeholder="100자 이내"
            onChange={handelChangeInfo}
            onBlur={handleInputInfo}
          ></InputInfo>
        </Form>
        <ModifyButton
          type="button"
          onClick={() => handleModifyBtn(userData)}
          disabled={disabledBtn}
        >
          수정하기
        </ModifyButton>
      </SignUpPageWrap>
    </>
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

const InputInfo = styled.textarea`
  font-family: 'GmarketSansMedium';
  font-size: 1rem;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid ${PALLETS.LIGHT_GRAY};
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
