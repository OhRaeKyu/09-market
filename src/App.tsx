import React from 'react';
import './styles/App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import SplashPage from './pages/SplashPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ProfileModifyPage from './pages/ProfileModifyPage';
import PassWordModify from './pages/ProfileModifyPage/PassWordModify';
import UserDetailModify from './pages/ProfileModifyPage/UserDetailModify';
import AddressModify from './pages/ProfileModifyPage/AddressModify';
import ItemUploadPage from './pages/ItemUploadPage';
import ItemDetailPage from './pages/ItemDetailPage';
import ItemModifyPage from './pages/ItemModifyPage';
import SearchPage from './pages/SearchPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, []);

  return loading ? (
    <SplashPage />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/profile/detail/:userId" element={<ProfilePage />} />
        </Route>

        <Route path="/profile/modify/main" element={<ProfileModifyPage />} />
        <Route path="/profile/modify/user" element={<UserDetailModify />} />
        <Route path="/profile/modify/address" element={<AddressModify />} />
        <Route path="/profile/modify/password" element={<PassWordModify />} />
        <Route path="/item/upload" element={<ItemUploadPage />} />
        <Route path="/item/detail/:itemId" element={<ItemDetailPage />} />
        <Route path="/item/modify/:itemId" element={<ItemModifyPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
