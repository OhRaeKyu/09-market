import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';

export default function InputComment() {
  const params = useParams();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [inputComment, setInputComment] = useState('');

  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(e.target.value);
  };

  const handleSubmitBtn = async (comment: string) => {
    const userToken = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

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

  const pressEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputComment.length > 0 && handleSubmitBtn(inputComment);
    }
  };

  useEffect(() => {
    setBtnDisabled(inputComment.length > 0 ? false : true);
  }, [inputComment]);

  return (
    <Form>
      <FormWrap>
        <Label htmlFor="inpComment" className="blind">
          댓글 입력
        </Label>
        <Comment
          type="text"
          id="inpComment"
          value={inputComment}
          placeholder="댓글을 입력해주세요."
          maxLength={500}
          onChange={handleInputComment}
          onKeyDown={pressEnterKey}
        />
        <SubmitBtn
          type="button"
          disabled={btnDisabled}
          onClick={() => handleSubmitBtn(inputComment)}
        >
          등록
        </SubmitBtn>
      </FormWrap>
    </Form>
  );
}

const Form = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100vw;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${PALLETS.WHITE};
`;

const FormWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  margin: 0 auto;

  @media screen and (min-width: 420px) {
    max-width: 80vw;
  }
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
