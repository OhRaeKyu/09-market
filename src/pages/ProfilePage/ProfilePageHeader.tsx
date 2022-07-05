import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import { PALLETS } from '@/utils/constants';
import { setModalMode, setModalOpen } from '@/modules/modalModule';

export default function ProfilePageHeader() {
  const dispatch = useDispatch();
  const currentUserId = sessionStorage.getItem('userId');
  const profileUserId = useSelector((state) => state.userProfile.userId);
  const authorization = currentUserId == profileUserId;

  const modalOpen = () => {
    dispatch(setModalMode('로그아웃'));
    dispatch(setModalOpen(true));
  };

  return (
    <ProfilePageHeaderWrap>
      {authorization && (
        <OptionButton type="button" onClick={modalOpen}>
          <span className="blind">옵션 버튼</span>
        </OptionButton>
      )}
    </ProfilePageHeaderWrap>
  );
}

const ProfilePageHeaderWrap = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${PALLETS.PURPLE};
  z-index: 9999;
`;

const OptionButton = styled.button`
  position: absolute;
  right: 7vw;
  width: 25px;
  height: 25px;
  background-image: url('/images/option.png');
  background-size: cover;
`;
