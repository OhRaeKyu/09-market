import React from 'react';

import GoBackHeader from 'components/GoBackHeader';
import ProfileModifyForm from './ProfileModifyForm';

export default function ProfileModifyPage() {
  return (
    <>
      <GoBackHeader headerTitle="프로필 수정" />
      <ProfileModifyForm />
    </>
  );
}
