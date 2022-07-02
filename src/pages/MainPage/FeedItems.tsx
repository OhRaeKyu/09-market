import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { setImgSrc } from '@/utils/setImgSrc';
import { setItemsList } from '@/modules/itemModule';
import { RootState } from '@/modules';

import FeedLoading from './FeedLoading';

export default function FeedItems() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.itemsList.items);
  const currentCategory = useSelector((state: RootState) => state.category);

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

  console.log(items);

  return !!items ? (
    <>
      <h2 className="blind">{currentCategory} 카테고리 게시글</h2>
      <PostsWrap>
        {items.map((item) => (
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
                  {item.comments}
                </ItemComment>
              </ItemInfo>
            </Link>
          </PostItem>
        ))}
      </PostsWrap>
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
