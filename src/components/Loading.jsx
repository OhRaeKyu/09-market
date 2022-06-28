import React from 'react';
import styled from 'styled-components';

export default function Loading() {
  return <LoadingWrap>로딩 중</LoadingWrap>;
}

const LoadingWrap = styled.main`
  width: 100vw;
  height: calc(100vh - 240px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
