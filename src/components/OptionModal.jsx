import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PALLETS } from 'utils/constants';

export default function OptionModal({ optionClicked, setOptionClicked, mode }) {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate('/signin');
  };

  const ProfileImgModify = () => {};

  const optionItems = (modalMode) => {
    switch (modalMode) {
      case 'logout':
        return (
          <ModalItem>
            <LogOutBtn type="button" onClick={logOut}>
              로그아웃
            </LogOutBtn>
          </ModalItem>
        );
      case 'profileImgModify':
        return (
          <ModalItem>
            <ProfileImgModifyBtn type="button" onClick={ProfileImgModify}>
              이미지 변경
            </ProfileImgModifyBtn>
          </ModalItem>
        );
      default:
        break;
    }
  };

  return (
    <ModalWrap>
      <ModalContainer
        optionClicked
        onClick={() => setOptionClicked(!optionClicked)}
      >
        {optionItems(mode)}
      </ModalContainer>
      <BackGround onClick={() => setOptionClicked(false)} />
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
  display: ${(props) => (props.profileClicked ? 'block' : 'none')};
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
  padding: 20px;

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
  & + li {
    margin-top: 20px;
  }
`;

const LogOutBtn = styled.button`
  color: ${PALLETS.BLACK};
`;

const ProfileImgModifyBtn = styled(LogOutBtn)``;

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;
