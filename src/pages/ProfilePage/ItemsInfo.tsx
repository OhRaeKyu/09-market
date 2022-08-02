import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from '@/hooks/useTypedSelector';

import { setImgSrc } from '@/utils/setImgSrc';

export default function ItemsInfo() {
  const { items } = useSelector((state) => state.userProfile);
  console.log(
    'the same key 경고는 백엔드에서 같은 id의 게시글을 여러개 반환하여 발생하는 문제로 현재 해결 중입니다.'
  );

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
  width: 95vw;
  margin: 10px auto;

  @media screen and (min-width: 420px) {
    width: 70vw;
  }
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
