import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import SplashPage from 'pages/SplashPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ProfileModifyPage from './pages/ProfileModifyPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SearchPage from 'pages/SeacrhPage';
import ItemUploadPage from 'pages/ItemUploadPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
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

        <Route path="/profile/modify" element={<ProfileModifyPage />} />
        <Route path="/item/upload" element={<ItemUploadPage />} />
        <Route path="/item/detail/:itemId" element={<ItemDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
