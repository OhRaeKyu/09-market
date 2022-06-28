import React from 'react';
import styled from 'styled-components';

import GoBackHeader from 'components/GoBackHeader';
import ItemData from './ItemData';
import CommentsData from './CommentsData';
import InputComment from './InputComment';

export default function ItemDetailPage() {
  return (
    <>
      <GoBackHeader headerTitle="상품" />
      <ItemDetailWrap>
        <ItemData />
        <CommentsData />
        <InputComment />
      </ItemDetailWrap>
    </>
  );
}

const ItemDetailWrap = styled.main``;
