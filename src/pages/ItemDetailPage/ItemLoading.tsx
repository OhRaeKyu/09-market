import React from 'react';
import styled from 'styled-components';

import profileSrc from '@/images/profileImg.svg';

export default function ItemLoading() {
  return (
    <ItemLoadingWrap>
      <SkeletonItemHeader>
        <SkeletonImg src={profileSrc} />
        <SkeletonAuthor className="skeleton" />
      </SkeletonItemHeader>
      <SkeletonItem className="skeleton" />
    </ItemLoadingWrap>
  );
}

const ItemLoadingWrap = styled.div`
  max-width: 95vw;
  margin: 80px auto 0;

  @media screen and (min-width: 420px) {
    max-width: 70vw;
  }
`;

const SkeletonImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const SkeletonAuthor = styled.div`
  height: 1rem;
  width: 3rem;
`;

const SkeletonItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SkeletonItem = styled.div`
  width: 100%;
  height: 300px;

  @media screen and (min-width: 420px) {
    height: 500px;
  }
`;
