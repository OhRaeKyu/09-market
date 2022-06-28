import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import ItemsInfo from './ItemsInfo';
import OptionModal from 'components/OptionModal';

import { isLogined } from 'utils/isLogined';

export default function ProfilePage() {
  const [optionClicked, setOptionClicked] = useState(false);

  if (isLogined()) {
    return (
      <>
        <UserInfo />
        <ItemsInfo />
        {optionClicked && (
          <OptionModal
            optionClicked={optionClicked}
            setOptionClicked={setOptionClicked}
          />
        )}
      </>
    );
  } else {
    return <Navigate replace to="/signin" />;
  }
}
