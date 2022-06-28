import React from 'react';
import { useLocation } from 'react-router-dom';

import MainPageHeader from '../pages/MainPage/MainPageHeader';
import ProfilePageHeader from 'pages/ProfilePage/ProfilePageHeader';

export default function Header() {
  const location = useLocation().pathname;

  if (location === '/') return <MainPageHeader />;
  else if (/^\/profile/.test(location)) return <ProfilePageHeader />;
}
