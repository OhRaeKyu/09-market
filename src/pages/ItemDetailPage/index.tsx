import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import GoBackHeader from '@/components/GoBackHeader';
import ItemData from './ItemData';
import CommentsData from './CommentsData';
import InputComment from './InputComment';

export interface itemData {
  name: string;
  itemImageUrl: string;
  isLiked?: boolean;
  instagramUrl: string;
}

export default function ItemDetailPage() {
  const itemId = useParams().itemId;
  const userId = localStorage.getItem('userId');

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
