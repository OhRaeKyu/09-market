import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { PALLETS } from '@/utils/constants';
import { setModalOpen } from '@/modules/modalModule';

export default function OptionModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemId = useParams().itemId;

  const { mode } = useSelector((state) => state.modeOfModal);

  const modalClose = () => {
    dispatch(setModalOpen(false));
  };

  const logOut = () => {
    sessionStorage.clear();
    navigate('/signin');
  };

  const ProfileImgModify = () => {};

  const DeleteItem = async () => {
    const userToken = sessionStorage.getItem('token');

    await axios
      .delete(`/item/${itemId}}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const optionItems = (modalMode: string | undefined) => {
    switch (modalMode) {
      case '로그아웃':
        return (
          <ModalItem>
            <Option type="button" onClick={logOut}>
              로그아웃
            </Option>
          </ModalItem>
        );
      case '프로필이미지수정':
        return (
          <ModalItem>
            <Option type="button" onClick={ProfileImgModify}>
              이미지 변경
            </Option>
          </ModalItem>
        );
      case '아이템삭제':
        return (
          <ModalItem>
            <Option type="button" onClick={() => DeleteItem()}>
              아이템 삭제
            </Option>
          </ModalItem>
        );
      default:
        break;
    }
  };

  return (
    <ModalWrap>
      <ModalContainer onClick={modalClose}>{optionItems(mode)}</ModalContainer>
      <BackGround onClick={modalClose} />
    </ModalWrap>
  );
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
