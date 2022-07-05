import React from 'react';
import styled from 'styled-components';

export default function NotFoundPage() {
  return (
    <NotFoundPageWrap>
      <h2>페이지를 찾을 수 없습니다.</h2>
    </NotFoundPageWrap>
  );
}

const NotFoundPageWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
