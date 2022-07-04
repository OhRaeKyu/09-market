import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from '@/hooks/useTypedSelector';

import { setImgSrc } from '@/utils/setImgSrc';

export default function ItemData() {
  const item = useSelector((state) => state.itemDetail);

  const { userId, itemImageUrl, name, comments, instagramUrl } = item;
  const commentsLength = comments.length;

  return (
    <PostItemContainer>
      <PostItemItem>
        <PostAuthorWrap to={`/profile/detail/${userId}`}>
          <AuthorImage src="" alt="" />
          <AuthorName></AuthorName>
        </PostAuthorWrap>
        <ItemTitle>{name}</ItemTitle>
        <ItemImage src={setImgSrc(itemImageUrl)} alt={name} />
        <ItemInfoWrap>
          <Comment>
            <span className="blind">댓글 수</span>
            {commentsLength}
          </Comment>
          <InstagramLink href={instagramUrl} target="_blank">
            Instagram 이동하기 {'>'}
          </InstagramLink>
        </ItemInfoWrap>
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
  padding: 80px 2.5vw 0;

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
  border-radius: 5px;

  @media screen and (min-width: 420px) {
    height: 500px;
  }
`;

const ItemInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const Comment = styled.p`
  position: relative;
  margin-left: 2.5rem;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -0.3rem;
    left: -2rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('/images/comment_black.png');
    background-size: cover;
  }
`;

const InstagramLink = styled.a``;
