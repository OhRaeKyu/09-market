import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import DaumPostcode from 'react-daum-postcode';
import { setUserData } from '@/modules/userModule';

interface Props {
  setModal: (modal: boolean) => void;
}

export default function AddressModal({ setModal }: Props) {
  const dispatch = useDispatch();

  const handleComplete = (data: { address: string; zonecode: string }) => {
    dispatch(setUserData({ zipcode: data.zonecode, address: data.address }));
    setModal(false);
  };
  return (
    <>
      <Background onClick={() => setModal(false)} />
      <DaumPostcodeWrap>
        <DaumPostcode onComplete={handleComplete} style={{ height: '100%' }} />
      </DaumPostcodeWrap>
    </>
  );
}

const DaumPostcodeWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 470px;
  border: 1px solid black;
  z-index: 300;

  @media screen and (min-width: 420px) {
    width: 80vw;
    height: 450px;
  }
`;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
`;
