import React, { useState, useEffect } from 'react';

import SearchHeader from './SearchHeader';
import SearchResult from './SearchResult';

export default function SearchPage() {
  return (
    <>
      <SearchHeader />
      <SearchResult />
    </>
  );
}
