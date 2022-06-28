import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

import axios from '../../api/axios';
import { PALLETS } from 'utils/constants';
import { useDebounce } from 'hooks/useDebounce';
import { setImgSrc } from 'utils/setImgSrc';

export default function SearchResult() {
  const [itemsData, setItemsData] = useState([]);

  const searchQuery = new URLSearchParams(useLocation().search);
  const searchKeyword = useDebounce(searchQuery.get('q'), 300);

  const getSeacrhItem = async (keyword) => {
    await axios
      .get(`/item/search/${keyword}`)
      .then((res) => {
        setItemsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSeacrhItem(searchKeyword);
  }, [searchKeyword]);

  return (
    <SearchResultWrap>
      <h2 className="blind">검색 결과</h2>
      <PostsWrap>
        {itemsData.map((item) => (
          <PostItem key={item.itemId}>
            <Link to={`/item/detail/${item.itemId}`}>
              <ItemImageWrap>
                <ItemImage src={setImgSrc(item.itemImageUrl)} alt={item.name} />
                <ItemBackground />
              </ItemImageWrap>
              <ItemInfo>
                <ItemLike>
                  <span className="blind">좋아요 수</span>
                  {item.likes}
                </ItemLike>
                <ItemComment>
                  <span className="blind">댓글 수</span>
                  {item.comments.length}
                </ItemComment>
              </ItemInfo>
            </Link>
          </PostItem>
        ))}
      </PostsWrap>
    </SearchResultWrap>
  );
}

const SearchResultWrap = styled.main`
  margin-top: 70px;
`;

const PostsWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 420px) {
    max-width: 70vw;
    margin: 0 auto;
  }
`;

const PostItem = styled.li`
  cursor: pointer;
  position: relative;
  width: 95%;
  margin-top: 3vw;
`;

const ItemImageWrap = styled.div``;

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

const ItemBackground = styled.div`
  display: block;
  content: '';
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to top, ${PALLETS.BLACK}, rgba(0, 0, 0, 0));
  position: absolute;
  bottom: 4px;
  left: 0;
  border-radius: 0 0 5px 5px;
`;

const ItemInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: ${PALLETS.WHITE};
  width: 50%;
  display: flex;
  justify-content: space-evenly;
`;

const ItemLike = styled.p`
  position: relative;

  &::before {
    display: block;
    content: '';
    width: 1rem;
    height: 1rem;
    background-image: url('/images/heart_white.png');
    background-size: cover;
    position: absolute;
    left: -25px;
  }
`;

const ItemComment = styled(ItemLike)`
  &::before {
    background-image: url('/images/comment_white.png');
  }
`;
