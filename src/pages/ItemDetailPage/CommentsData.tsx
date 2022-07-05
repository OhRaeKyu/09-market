import styled from 'styled-components';
import { useSelector } from '@/hooks/useTypedSelector';

export default function CommentsData() {
  const { comments } = useSelector((state) => state.itemDetail);

  const renderComments = [...comments].reverse().map((comment) => {
    const { commentId, content } = comment;
    return (
      <CommentItem key={commentId}>
        <UserInfoWrap></UserInfoWrap>
        <CommentContent>{content}</CommentContent>
      </CommentItem>
    );
  });

  return comments.length > 0 ? (
    <CommentsWrap>
      <CommentsList>{renderComments}</CommentsList>
    </CommentsWrap>
  ) : (
    <></>
  );
}

const CommentsWrap = styled.section`
  padding: 20px 15px 0;
`;

const CommentsList = styled.ul`
  @media screen and (min-width: 420px) {
    max-width: 70vw;
    margin: 0 auto;
  }
`;

const CommentItem = styled.li``;

const UserInfoWrap = styled.div``;

const CommentContent = styled.p``;
