import React from 'react';
import styled from 'styled-components';

import Skeleton from '@/components/Skeleton';

export default function ItemLoading() {
  return (
    <>
      <SkeletonAuthor className="skeleton" />
      <SkeletonItem className="skeleton" />
    </>
  );
}

const SkeletonAuthor = styled.div`
  height: 32px;
`;

const SkeletonItem = styled.div``;
