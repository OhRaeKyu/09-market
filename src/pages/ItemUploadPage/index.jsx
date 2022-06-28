import React from 'react';
import { Navigate } from 'react-router-dom';

import { isLogined } from 'utils/isLogined';

import GoBackHeader from 'components/GoBackHeader';
import ItemUploadForm from './ItemUploadForm';

export default function ItemUploadPage() {
  if (isLogined()) {
    return (
      <>
        <GoBackHeader headerTitle="새 게시물" />
        <ItemUploadForm />
      </>
    );
  } else {
    return <Navigate replace to="/signin" />;
  }
}
