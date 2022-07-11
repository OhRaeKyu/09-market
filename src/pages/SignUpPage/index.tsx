import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { isLogined } from '@/utils/isLogined';

import GoBackHeader from '@/components/GoBackHeader';
import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';
import { deleteUserData } from '@/modules/userModule';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const [step, setStep] = useState('basic');

  const clearUserData = () => {
    dispatch(deleteUserData());
  };

  useEffect(() => {
    clearUserData();
  }, []);

  if (isLogined()) {
    return <Navigate replace to="/" />;
  } else {
    return step === 'basic' ? (
      <>
        <GoBackHeader headerTitle={'회원가입'} />
        <BasicInformation setStep={setStep} />
      </>
    ) : (
      <>
        <GoBackHeader headerTitle={'회원가입'} setStep={setStep} />
        <PersonalInformation />
      </>
    );
  }
}
