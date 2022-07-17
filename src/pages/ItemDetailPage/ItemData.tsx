import React from 'react';
import styled from 'styled-components';
import { useSelector } from '@/hooks/useTypedSelector';

import { PALLETS } from '@/utils/constants';
import { setImgSrc } from '@/utils/setImgSrc';
import { setPriceNotation } from '@/utils/setPriceNotation';

import WriterProfile from './WriterProfile';
import commentSrc from '@/images/comment_black.svg';

export default function ItemData() {
  const item = useSelector((state) => state.itemDetail);

  const { itemImageUrl, name, price, itemInfo, comments, instagramUrl } = item;
  const commentsLength = comments.length;

  return (
    <PostItemContainer>
      <PostItemItem>
        <WriterProfile />
        <ItemImage src={setImgSrc(itemImageUrl)} alt={name} />
        <ItemTitle>{name}</ItemTitle>

        <ItemExplanation>{itemInfo}</ItemExplanation>
        <ItemInfoWrap>
          <Comment>
            <span className="blind">댓글 수</span>
            {commentsLength}
          </Comment>
          <ItemPrice>
            공구가
            <span> {setPriceNotation(price)}</span>원
          </ItemPrice>
        </ItemInfoWrap>
        <InstagramLink href={instagramUrl} target="_blank">
          Instagram 이동하기
        </InstagramLink>
      </PostItemItem>
    </PostItemContainer>
  );
}
const PostItemContainer = styled.section`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PostItemItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 80px;
  max-width: 95vw;

  @media screen and (min-width: 420px) {
    max-width: 70vw;
  }
`;

const ItemImage = styled.img`
  position: relative;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemTitle = styled.h2`
  margin: 20px 0;
  font-size: 1.5rem;
  font-weight: 800;
`;

const ItemExplanation = styled.p`
  color: rgba(0, 0, 0, 0.6);
`;

const ItemInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const Comment = styled.p`
  position: relative;
  margin-left: 2rem;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -5px;
    left: -2rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(${commentSrc});
    background-size: cover;
  }
`;

const ItemPrice = styled.p`
  span {
    font-family: 'GmarketSansBold';
    font-size: 1.5rem;
  }
`;

const InstagramLink = styled.a`
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 1rem;

  width: 170px;
  height: 2rem;
  line-height: 2rem;
  background-color: ${PALLETS.WHITE};
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  z-index: 9999;

  &::after {
    content: '>';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }
`;
