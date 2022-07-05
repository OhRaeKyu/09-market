import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from '@/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';

import { setImgSrc } from '@/utils/setImgSrc';
import { setModalMode, setModalOpen } from '@/modules/modalModule';
import { setDeleteComment } from '@/modules/itemModule';

export default function CommentsData() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.itemDetail);

  const authorizationCheck = (writerId: string) => {
    const currentUserId = sessionStorage.getItem('userId');
    return currentUserId == writerId;
  };

  const profileImgSrc = (url: string | null) => {
    if (!url) {
      return '/images/profileImg.png';
    } else {
      return setImgSrc(url);
    }
  };

  const openModal = (commentId: string) => {
    dispatch(setModalMode(['댓글 삭제']));
    dispatch(setModalOpen(true));
    dispatch(setDeleteComment(commentId));
  };

  const renderComments = [...comments].reverse().map((comment) => {
    const { commentId, userId, nickname, userImageUrl, content } = comment;
    const isWriter = authorizationCheck(userId);
    return (
      <CommentItem key={commentId}>
        <Link to={`/profile/detail/${userId}`}>
          <UserImage
            src={profileImgSrc(userImageUrl)}
            alt={`${nickname}의 프로필 이미지`}
          />
        </Link>
        <CommentWrap>
          <UserName>{nickname}</UserName>
          <CommentContent>{content}</CommentContent>
        </CommentWrap>
        {isWriter && (
          <OptionBtn type="button" onClick={() => openModal(commentId)} />
        )}
      </CommentItem>
    );
  });

  return comments.length > 0 ? (
    <CommentsContainer>
      <CommentsList>{renderComments}</CommentsList>
    </CommentsContainer>
  ) : (
    <></>
  );
}

const CommentsContainer = styled.section`
  padding: 0 15px;
`;

const CommentsList = styled.ul`
  @media screen and (min-width: 420px) {
    max-width: 70vw;
    margin: 0 auto;
  }
`;

const CommentItem = styled.li`
  display: flex;
  padding: 10px 0;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
`;

const CommentWrap = styled.div`
  margin-left: 10px;
`;

const UserName = styled.p`
  font-weight: 800;
  line-height: 32px;
`;

const CommentContent = styled.p`
  color: rgba(0, 0, 0, 0.6);
`;

const OptionBtn = styled.button`
  position: absolute;
  right: 10px;

  &::after {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('/images/more.png');
    background-size: cover;
  }
`;
