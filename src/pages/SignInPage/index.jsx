import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { isLogined } from 'utils/isLogined';
import { PALLETS } from 'utils/constants';

import GoBackHeader from 'components/GoBackHeader';
import SingInForm from './SingInForm';

export default function SignInPage() {
  if (isLogined()) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <GoBackHeader />
        <SignInPageWrap>
          <h1 className="blind">로그인</h1>
          <Logo to="/">
            공구<ColorLogo>마켓</ColorLogo>
          </Logo>
          <SingInForm />
          <Link to="/signup">회원가입</Link>
        </SignInPageWrap>
      </>
    );
  }
}
const SignInPageWrap = styled.main`
  height: 100vh;
  max-width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 2.5rem;
  font-family: 'GmarketSansBold';
  color: ${PALLETS.PURPLE};
  animation: scale 0.3s ease-out;

  @keyframes scale {
    0% {
      transform: scale(0.5);
    }
    100 % {
      transform: scale(1);
    }
  }
`;

const ColorLogo = styled.span`
  color: ${PALLETS.SKY_BLUE};
`;
