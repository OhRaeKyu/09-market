import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { setModalOpen } from '@/modules/modalModule';
import { deleteUserData } from '@/modules/userModule';

export default function OptionModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemId = useParams().itemId;

  const { mode } = useSelector((state) => state.modeOfModal);
  const { commentId } = useSelector((state) => state.commentId);

  const modalClose = () => {
    dispatch(setModalOpen(false));
  };

  const logOut = () => {
    dispatch(deleteUserData());
    sessionStorage.clear();
    navigate('/signin');
  };

  const deleteItem = async () => {
    const userToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    await axios
      .delete(`/item/${itemId}`, { headers })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = async () => {
    const userToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    await axios
      .delete(`/comment/${commentId}`, { headers })
      .then(() => {
        navigate(`/item/detail/${itemId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalClick = (mode: string) => {
    switch (mode) {
      case '로그아웃':
        return logOut();
      case '아이템 삭제':
        return deleteItem();
      case '댓글 삭제':
        return deleteComment();
      default:
        break;
    }
  };

  const renderOptions = mode.map((item, index) => {
    return (
      <ModalItem key={index}>
        <Option type="button" onClick={() => modalClick(item)}>
          {item}
        </Option>
      </ModalItem>
    );
  });

  if (mode.length > 0) {
    return (
      <ModalWrap>
        <ModalContainer onClick={modalClose}>{renderOptions}</ModalContainer>
        <BackGround onClick={modalClose} />
      </ModalWrap>
    );
  } else {
    return <></>;
  }
}

const ModalWrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
`;

const ModalContainer = styled.ul`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  color: ${PALLETS.BLACK};
  background-color: ${PALLETS.WHITE};
  border: 1px solid ${PALLETS.PURPLE};
  border-bottom: none;
  border-radius: 15px 15px 0 0;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  animation: modal 0.3s ease-out;
  z-index: 9999;

  @keyframes modal {
    0% {
      transform: translateY(100%);
    }
    100 % {
      transform: translateY(0);
    }
  }
`;

const ModalItem = styled.li`
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Option = styled.button`
  color: ${PALLETS.BLACK};
`;

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;
