import React from 'react';
import styled from 'styled-components';
import { PALLETS } from 'utils/constants';

export default function SplashPage() {
  return (
    <SplashPageWrap>
      <PrevText>공구</PrevText>
      <NextText>마켓</NextText>
    </SplashPageWrap>
  );
}

const SplashPageWrap = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevText = styled.p`
  color: ${PALLETS.PURPLE};
  font-size: 3rem;
  font-family: 'GmarketSansBold';
  animation: moveDown 0.8s ease-out;

  @keyframes moveDown {
    0% {
      transform: translateY(-900%);
    }
    60% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(-30%);
    }
    80% {
      transform: translateY(0);
    }
    90% {
      transform: translateY(-30%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const NextText = styled(PrevText)`
  color: ${PALLETS.SKY_BLUE};
  animation: none;
`;
