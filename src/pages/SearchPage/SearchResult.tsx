import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { setImgSrc } from '@/utils/setImgSrc';
import { InitItemDetail } from '@/utils/types';
import { useDebounce } from '@/hooks/useDebounce';

import commentSrc from '@/images/comment_white.png';

export default function SearchResult() {
  const [resultItems, setResultItems] = useState<InitItemDetail[]>([]);

  const searchQuery = new URLSearchParams(useLocation().search);
  const searchKeyword = useDebounce(searchQuery.get('q'), 300);

  const getSeacrhItem = async (keyword: string) => {
    await axios
      .get(`/item/search/${keyword}`)
      .then((res) => {
        setResultItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!!searchKeyword) {
      getSeacrhItem(searchKeyword);
    } else {
      setResultItems([]);
    }
  }, [searchKeyword]);

  const renderResultList = resultItems.map((item) => {
    const { itemId, name, itemImageUrl, comments } = item;

    return (
      <PostItem key={itemId}>
        <Link to={`/item/detail/${itemId}`}>
          <ItemImage src={setImgSrc(itemImageUrl)} alt={name} />
          <ItemComment>
            <span className="blind">댓글 수</span>
            {comments.length}
          </ItemComment>
          <ItemBackground />
        </Link>
      </PostItem>
    );
  });

  if (resultItems.length > 0) {
    return (
      <SearchResultWrap>
        <h2 className="blind">검색 결과</h2>
        <PostsWrap>{renderResultList}</PostsWrap>
      </SearchResultWrap>
    );
  } else {
    return <></>;
  }
}

const SearchResultWrap = styled.main`
  margin-top: 70px;
`;

const PostsWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostItem = styled.li`
  cursor: pointer;
  position: relative;
  width: 95vw;
  height: 250px;
  margin-top: 3vw;

  @media screen and (min-width: 420px) {
    height: 500px;
    max-width: 70vw;
  }
`;

const ItemImage = styled.img`
  position: relative;
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;

  @media screen and (min-width: 420px) {
    height: 500px;
  }
`;

const ItemComment = styled.p`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: ${PALLETS.WHITE};

  &::before {
    display: block;
    content: '';
    width: 1rem;
    height: 1rem;
    background-image: url(${commentSrc});
    background-size: cover;
    position: absolute;
    left: -25px;
  }

  z-index: 10;
`;

const ItemBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 100px;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0)
  );

  border-radius: 0 0 5px 5px;
`;
