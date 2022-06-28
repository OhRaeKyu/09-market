import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PALLETS } from 'utils/constants';

export default function SearchHeader() {
  const navigate = useNavigate();

  const [inpKeyword, setInpKeyword] = useState('');

  const handleInputKeyword = (e) => {
    setInpKeyword(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <SearchHeaderWrap>
      <SearchHeaderItems>
        <h1 className="blind">검색 페이지</h1>
        <SearchButton>
          <span className="blind">검색 버튼</span>
        </SearchButton>
        <SearchInput
          type="text"
          value={inpKeyword}
          autoFocus
          placeholder="검색어를 입력하세요."
          onChange={handleInputKeyword}
        />
        <CancelButton
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          취소
        </CancelButton>
      </SearchHeaderItems>
    </SearchHeaderWrap>
  );
}

const SearchHeaderWrap = styled.header`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};

  z-index: 9999;
`;

const SearchHeaderItems = styled.div`
  max-width: 90vw;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchButton = styled.button`
  width: 25px;
  height: 25px;
  background-image: url('/images/search.png');
  background-size: cover;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 5px 0 5px 10px;
  border-radius: 5px;
  animation: searchBar 0.3s ease-out forwards;

  @keyframes searchBar {
    0% {
      width: 0;
    }
    100% {
      width: calc(90vw - 80px);
    }
  }

  &:focus {
    outline: none;
  }
`;

const CancelButton = styled.button`
  width: 35px;
  color: ${PALLETS.WHITE};
`;
