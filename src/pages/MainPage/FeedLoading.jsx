import React from 'react';
import styled from 'styled-components';
import { PALLETS } from 'utils/constants';

export default function FeedLoading() {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
}

const Skeleton = styled.div`
  position: relative;
  width: 95vw;
  height: 250px;
  margin: 3vw auto 0;
  border-radius: 5px;
  background-color: ${PALLETS.LIGHT_GRAY};

  @media screen and (min-width: 420px) {
    height: 500px;
    max-width: 70vw;
  }

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(95vw);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20vw;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1)
    );
    animation: loading 0.5s infinite linear;
  }
`;
