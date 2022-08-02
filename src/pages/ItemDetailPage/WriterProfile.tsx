import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from '@/hooks/useTypedSelector';

import { setImgSrc } from '@/utils/setImgSrc';
import profileSrc from '@/images/profileImg.svg';

export default function WriterProfile() {
  const { userId, nickname, userImageUrl } = useSelector(
    (state) => state.itemDetail
  );

  const profileImgSrc = (url: string | null) => {
    if (!url) {
      return profileSrc;
    } else {
      return setImgSrc(url);
    }
  };

  return (
    <PostAuthorWrap to={`/profile/detail/${userId}`}>
      <AuthorImage
        src={profileImgSrc(userImageUrl)}
        alt={`${nickname}의 프로필 이미지`}
      />
      <AuthorName>{nickname}</AuthorName>
    </PostAuthorWrap>
  );
}

const PostAuthorWrap = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const AuthorName = styled.p`
  font-weight: 800;
`;
