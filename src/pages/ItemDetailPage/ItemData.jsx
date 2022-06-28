import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { setImgSrc } from 'utils/setImgSrc';

import ItemLoading from './ItemLoading';

export default function ItemData() {
  const itemId = useParams().itemId;
  const [itemData, setItemData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likesNum, setLikesNum] = useState(0);
  const [commentsNum, setCommentsNum] = useState(0);

  const getItem = useCallback(async () => {
    await axios
      .get(`/item/detail/${itemId}`)
      .then((res) => {
        setItemData(res.data);
        setLikesNum(res.data.likes);
        setCommentsNum(res.data.comments.length);
      })
      .catch((err) => console.log(err));
  }, [itemId]);

  const toggleLike = () => {
    isLiked ? setLikesNum(likesNum - 1) : setLikesNum(likesNum + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    getItem();
  }, [getItem]);

  return Object.keys(itemData).length > 0 ? (
    <PostItemContainer>
      <PostItemItem>
        <PostAuthorWrap to="">
          <AuthorImage src="" alt="" />
          <AuthorName></AuthorName>
        </PostAuthorWrap>
        <ItemTitle>{itemData.name}</ItemTitle>
        <ItemImage src={setImgSrc(itemData.itemImageUrl)} alt={itemData.name} />
        <ItemInfoWrap>
          <LikeAndComment>
            <Like isLiked={isLiked} onClick={toggleLike}>
              <span className="blind">좋아요 수</span>
              {likesNum}
            </Like>
            <Comment>
              <span className="blind">댓글 수</span>
              {commentsNum}
            </Comment>
          </LikeAndComment>
          <InstagramLink href={itemData.instagramUrl} target="_blank">
            Instagram 이동하기 {'>'}
          </InstagramLink>
        </ItemInfoWrap>
      </PostItemItem>
    </PostItemContainer>
  ) : (
    <ItemLoading />
  );
}
const PostItemContainer = styled.section`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PostItemItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 2.5vw 10px;

  @media screen and (min-width: 420px) {
    max-width: 70vw;
    margin: 0 auto;
  }
`;

const PostAuthorWrap = styled(Link)`
  display: flex;
  align-items: center;
  height: 50px;
`;

const AuthorImage = styled.img``;

const AuthorName = styled.p``;

const ItemTitle = styled.h2`
  margin-left: 0.5rem;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-family: 'GmarketSansBold';
`;

const ItemImage = styled.img`
  position: relative;
  width: 100%;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 5px;

  @media screen and (min-width: 420px) {
    height: 500px;
  }
`;

const InstagramLink = styled.a``;

const ItemInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
`;

const Like = styled.p`
  position: relative;
  margin-left: 2.5rem;

  &:before {
    display: block;
    content: '';
    position: absolute;
    top: -0.25rem;
    left: -2rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('/images/heart_${(props) =>
      props.isLiked ? 'red' : 'black'}.png');
    background-size: cover;
    ${(props) => props.isLiked && 'animation: liked .3s ease-in-out'};

    @keyframes liked {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.3);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

const Comment = styled(Like)`
  &:before {
    background-image: url('/images/comment_black.png');
  }
`;
