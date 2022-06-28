import React, { useState } from 'react';
import styled from 'styled-components';

import { PALLETS } from 'utils/constants';

import OptionModal from 'components/OptionModal';

export default function ProfilePageHeader() {
  const [optionClicked, setOptionClicked] = useState(false);

  return (
    <>
      {optionClicked && (
        <OptionModal
          optionClicked={optionClicked}
          setOptionClicked={setOptionClicked}
          mode={'logout'}
        />
      )}

      <ProfilePageHeaderWrap>
        <OptionButton
          type="button"
          onClick={() => setOptionClicked(!optionClicked)}
        >
          <span className="blind">옵션 버튼</span>
        </OptionButton>
      </ProfilePageHeaderWrap>
    </>
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
