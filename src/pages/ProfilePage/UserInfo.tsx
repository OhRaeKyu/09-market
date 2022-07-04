import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import { setImgSrc } from '@/utils/setImgSrc';
import { setModalMode, setModalOpen } from '@/modules/modalModule';

export default function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUserId = sessionStorage.getItem('userId');
  const profileUserId = useSelector((state) => state.userData.userId);
  const authorization = currentUserId == profileUserId;

  const { nickname, userImageUrl, userInfo } = useSelector(
    (state) => state.userData
  );

  const profileImgSrc = (url: string | null) => {
    if (!url) {
      return '/images/profileImg.png';
    } else {
      return setImgSrc(url);
    }
  };

  const openModal = () => {
    dispatch(setModalMode('프로필이미지수정'));
    dispatch(setModalOpen(true));
  };

  return (
    <UserInfoWrap>
      <UserInfoHeader>
        <UserProfileImg
          src={profileImgSrc(userImageUrl)}
          alt={`${nickname} 프로필 이미지`}
          onClick={authorization ? openModal : undefined}
        />
        <UserNameAndModify>
          <UserName>
            {nickname}
            <span className="blind"> 프로필 페이지</span>
          </UserName>
          {authorization && (
            <ProfileModifyBtn onClick={() => navigate('/profile/modify')}>
              프로필 편집
            </ProfileModifyBtn>
          )}
        </UserNameAndModify>
      </UserInfoHeader>
      {/* <UserInfo */}
    </UserInfoWrap>
  );
}

const UserInfoWrap = styled.section`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const UserInfoHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 1rem;
  width: 100%;
  max-width: 350px;

  @media screen and (min-width: 420px) {
    max-width: 500px;
  }
`;

const UserProfileImg = styled.img`
  width: 77px;
  height: 77px;
  margin-right: 2rem;
  border-radius: 50%;
  cursor: pointer;

  @media screen and (min-width: 420px) {
    width: 150px;
    height: 150px;
  }
`;

const UserNameAndModify = styled.div`
  width: 100%;
`;

const UserName = styled.h1`
  font-size: 1.3rem;
  font-weight: 800;
  text-align: center;
`;

const ProfileModifyBtn = styled.button`
  font-size: 0.75rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
