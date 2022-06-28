import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';

export default function CommentsData() {
  const itemId = useParams().itemId;
  const [commentsData, setCommentsData] = useState([]);

  const getComments = useCallback(async () => {
    await axios
      .get(`/item/detail/${itemId}`)
      .then((res) => {
        console.log(res.data.comments.reverse());
        setCommentsData(res.data.comments.reverse());
      })
      .catch((err) => console.log(err));
  }, [itemId]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <CommentsWrap>
      <CommentsList>
        {commentsData.map((item) => (
          <CommentItem key={item.itemId}>
            <UserInfoWrap></UserInfoWrap>
            <CommentContent>{item.content}</CommentContent>
          </CommentItem>
        ))}
      </CommentsList>
    </CommentsWrap>
  );
}

const CommentsWrap = styled.section`
  padding: 15px 15px 150px;
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
