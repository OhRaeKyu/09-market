import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import Nav from './Nav';

export default function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Nav />
    </>
  );
}

const Main = styled.main`
  margin-top: 70px;
  margin-bottom: 100px;
`;
