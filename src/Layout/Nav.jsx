import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PALLETS } from 'utils/constants';

export default function Nav() {
  const userId = localStorage.getItem('userId');

  return (
    <NavWrap>
      <NavContainer>
        <NavItem>
          <Link to="/" className="link-home">
            <span className="blind">메인 페이지로 이동</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/item/upload" className="link-upload">
            <span className="blind">아이템 업로드 페이지로 이동</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/profile/detail/${userId}`} className="link-profile">
            <span className="blind">프로필 페이지로 이동</span>
          </Link>
        </NavItem>
      </NavContainer>
    </NavWrap>
  );
}

const NavWrap = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${PALLETS.WHITE};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.ul`
  max-width: 90vw;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled.li`
  a[class^='link-'] {
    display: block;
    width: 30px;
    height: 30px;
    background-size: cover;
  }

  .link-home {
    background-image: url('/images/home.png');
  }

  .link-category {
    background-image: url('/images/category.png');
  }

  .link-upload {
    background-image: url('/images/plus.png');
  }

  .link-profile {
    background-image: url('/images/profile.png');
  }
`;
