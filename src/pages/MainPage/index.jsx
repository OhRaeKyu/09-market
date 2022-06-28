import React, { useState } from 'react';

import Category from './Category';
import FeedItems from './FeedItems';

export default function MainPage() {
  const [currentCategory, setCurrentCategory] = useState('전체');

  return (
    <>
      <Category
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <FeedItems currentCategory={currentCategory} />
    </>
  );
}
