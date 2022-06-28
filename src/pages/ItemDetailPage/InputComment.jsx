import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import axios from '../../api/axios';
import { PALLETS } from 'utils/constants';

export default function InputComment() {
  const params = useParams();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [inputComment, setInputComment] = useState('');

  const handleInputComment = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitBtn = async (comment) => {
    const userToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const data = {
      itemId: params.itemId,
      content: comment,
      userId: userId,
    };
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    await axios
      .post('/comment', data, { headers })
      .then(() => window.location.reload())
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setBtnDisabled(inputComment.length > 0 ? false : true);
  }, [inputComment]);

  return (
    <Form>
      <Label htmlFor="inpComment" className="blind">
        댓글 입력
      </Label>
      <Comment
        type="text"
        id="inpComment"
        value={inputComment}
        placeholder="댓글을 입력해주세요."
        maxLength="500"
        onChange={handleInputComment}
      />
      <SubmitBtn
        type="button"
        disabled={btnDisabled}
        onClick={() => handleSubmitBtn(inputComment)}
      >
        등록
      </SubmitBtn>
    </Form>
  );
}

const Form = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 4rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${PALLETS.WHITE};
`;

const Label = styled.label``;

const Comment = styled.input`
  width: 100%;
  margin-left: 1rem;

  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  font-size: 0.75rem;
  width: 45px;
  height: 30px;
  margin-right: 1rem;

  color: ${PALLETS.WHITE};
  background-color: ${PALLETS.PURPLE};
  border-radius: 5px;

  &:disabled {
    background-color: ${PALLETS.DARK_GRAY};
  }
`;
