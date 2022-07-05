import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { isLogined } from '@/utils/isLogined';

import GoBackHeader from '@/components/GoBackHeader';
import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';

export default function SignUpPage() {
  const [step, setStep] = useState('basic');

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
