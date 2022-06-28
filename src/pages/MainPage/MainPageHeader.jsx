import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PALLETS } from 'utils/constants';

export default function Header() {
  const navigate = useNavigate();

  const [hide, setHide] = useState(false);

  useEffect(() => {
    let prevScrollTop = 0;
    window.addEventListener('scroll', () => {
      const nextScrollTop = window.pageYOffset || 0;
      if (nextScrollTop > prevScrollTop) {
        setHide(true);
      } else if (nextScrollTop < prevScrollTop) {
        setHide(false);
      }
      prevScrollTop = nextScrollTop;
    });

    return () => {
      window.addEventListener('scroll', () => {});
    };
  }, []);

  const handleLinkLogo = () => {
    document.documentElement.scrollTop = 0;
    navigate('/');
  };

  return (
    <HeaderWrap className={hide && 'header-sticky'}>
      <HeaderItems>
        <Logo onClick={() => handleLinkLogo()}>
          공구
          <ColorLogo>마켓</ColorLogo>
        </Logo>
        <SearchButton to="/search">
          <span className="blind">검색 버튼</span>
        </SearchButton>
      </HeaderItems>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  transition: all 0.3s;
  z-index: 9999;

  &.header-sticky {
    transform: translateY(-100px);
  }
`;

const HeaderItems = styled.div`
  max-width: 90vw;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 420px) {
    max-width: 70vw;
  }
`;

const Logo = styled.h1`
  font-family: 'GmarketSansBold';
  font-size: 2rem;
  cursor: pointer;
`;

const ColorLogo = styled.span`
  color: ${PALLETS.SKY_BLUE};
`;

const SearchButton = styled(Link)`
  width: 25px;
  height: 25px;
  background-image: url('/images/search.png');
  background-size: cover;
`;
