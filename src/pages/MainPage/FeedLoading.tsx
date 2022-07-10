import React from 'react';
import styled from 'styled-components';

export default function FeedLoading() {
  return (
    <>
      <Skeleton className="skeleton" />
      <Skeleton className="skeleton" />
      <Skeleton className="skeleton" />
    </>
  );
}

const Skeleton = styled.div`
  width: 95vw;
  height: 250px;
  margin: 3vw auto 0;

  @media screen and (min-width: 420px) {
    width: 70vw;
    height: 500px;
  }
`;
