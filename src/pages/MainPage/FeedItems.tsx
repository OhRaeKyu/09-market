import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { setImgSrc } from '@/utils/setImgSrc';
import { setItemsList } from '@/modules/itemModule';

import FeedLoading from './FeedLoading';

export default function FeedItems() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemsList.items);
  const currentCategory = useSelector(
    (state) => state.category.currentCategory
  );

  const getFeedItems = async (category: string) => {
    const url = category === '전체' ? '/item' : `/item/${category}`;

    await axios
      .get(url)
      .then((res) => {
        dispatch(setItemsList(res.data.reverse()));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFeedItems(currentCategory);
  }, [currentCategory]);

  const renderItemsList = items.map((item) => {
    const { itemId, itemImageUrl, name, comments } = item;

    return (
      <PostItem key={itemId}>
        <Link to={`/item/detail/${itemId}`}>
          <ItemImageWrap>
            <ItemImage src={setImgSrc(itemImageUrl)} alt={name} />
            <ItemBackground />
          </ItemImageWrap>
          <ItemComment>
            <span className="blind">댓글 수</span>
            {comments}
          </ItemComment>
        </Link>
      </PostItem>
    );
  });

  return items.length > 0 ? (
    <>
      <h2 className="blind">{currentCategory} 카테고리 게시글</h2>
      <PostsWrap>{renderItemsList}</PostsWrap>
    </>
  ) : (
    <FeedLoading />
  );
}

const PostsWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostItem = styled.li`
  cursor: pointer;
  position: relative;
  width: 95vw;
  margin-top: 3vw;

  @media screen and (min-width: 420px) {
    max-width: 70vw;
  }
`;

const ItemImageWrap = styled.div`
  height: 250px;

  @media screen and (min-width: 420px) {
    height: 500px;
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
    background-image: url('/images/comment_white.png');
    background-size: cover;
    position: absolute;
    left: -25px;
  }
`;
