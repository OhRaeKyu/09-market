import React from 'react';
import styled from 'styled-components';

import { PALLETS } from '@/utils/constants';

export default function Skeleton() {
  return <SkeletonWrap className="skeleton" />;
}

const SkeletonWrap = styled.div`
  position: relative;
  width: 95vw;
  height: 250px;
  margin: 3vw auto 0;
  border-radius: 5px;
  background-color: ${PALLETS.LIGHT_GRAY};

  @media screen and (min-width: 420px) {
    max-width: 70vw;
    height: 500px;

    &::after {
      animation: loadingPC 0.5s infinite linear;
    }
  }
`;
