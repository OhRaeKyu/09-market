import React from 'react';
import { Navigate } from 'react-router-dom';

import { isLogined } from '@/utils/isLogined';

import GoBackHeader from '@/components/GoBackHeader';
import ItemModifyForm from './ItemModifyForm';

export default function ItemModifyPage() {
  if (isLogined()) {
    return (
      <>
        <GoBackHeader headerTitle="게시물 수정" />
        <ItemModifyForm />
      </>
    );
  } else {
    return <Navigate replace to="/signin" />;
  }
}
