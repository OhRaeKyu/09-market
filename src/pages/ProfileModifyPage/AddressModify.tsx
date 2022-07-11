import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { InitUserData } from '@/utils/types';

import GoBackHeader from '@/components/GoBackHeader';
import AddressModal from '@/components/AddressModal';

export default function AddressModify() {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [addressDetail, setAddressDetail] = useState('');

  const userData = useSelector((state) => state.userData);
  const { address, zipcode } = userData;

  const [error, setError] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const modifyVerify = () => {
    if (
      error.length === 0 &&
      address.length > 0 &&
      zipcode.length > 0 &&
      addressDetail.length > 0
    ) {
      setError('');
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const handleInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const handleModifyBtn = async (data: InitUserData) => {
    const userId = sessionStorage.getItem('userId');
    const detail = addressDetail;
    const modifyData = {
      zipcode: data.zipcode,
      address: data.address.concat(' ', detail),
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
      <FormWrap>
        <Form>
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
              onKeyUp={modifyVerify}
            />
          </AddressWrap>
        </Form>
        <ModifyButton
          type="button"
          onClick={() => handleModifyBtn(userData)}
          disabled={disabledBtn}
        >
          수정하기
        </ModifyButton>
        {modal && <AddressModal setModal={setModal} />}
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
