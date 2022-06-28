import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { isLogined } from 'utils/isLogined';

import GoBackHeader from 'components/GoBackHeader';
import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState('basic');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    nickname: '',
    mobile: '',
    address: '',
    zipcode: 0,
  });

  const handleUserData = (key, value) => {
    setUserData((prevObject) => ({ ...prevObject, [key]: value }));
  };

  if (isLogined()) {
    return <Navigate replace to="/" />;
  } else {
    return step === 'basic' ? (
      <>
        <GoBackHeader headerTitle={'회원가입'} />
        <BasicInformation setStep={setStep} handleUserData={handleUserData} />
      </>
    ) : (
      <>
        <GoBackHeader headerTitle={'회원가입'} setStep={setStep} />
        <PersonalInformation
          userData={userData}
          handleUserData={handleUserData}
        />
      </>
    );
  }
}
