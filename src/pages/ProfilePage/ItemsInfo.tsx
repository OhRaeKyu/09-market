import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from '@/hooks/useTypedSelector';

import { setImgSrc } from '@/utils/setImgSrc';

export default function ItemsInfo() {
  const { items } = useSelector((state) => state.userProfile);

  const renderItemsList = [...items].reverse().map((item) => {
    const { id, itemImageUrl, itemInfo } = item;
    return (
      <PostItem key={id}>
        <Link to={`/item/detail/${id}`}>
          <img src={setImgSrc(itemImageUrl)} alt={itemInfo} />
        </Link>
      </PostItem>
    );
  });

  if (items.length > 0) {
    return (
      <FeedInfoWrap>
        <h2 className="blind">업로드한 상품 정보</h2>
        <PostsContainer>{renderItemsList}</PostsContainer>
      </FeedInfoWrap>
    );
  } else {
    return <></>;
  }
}

const FeedInfoWrap = styled.section`
  max-width: 95vw;
  margin: 1rem auto 5px;
`;

const PostsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
`;

const PostItem = styled.li`
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NotExist = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 550px;
`;
