import React, { FC, ReactNode } from 'react';
import NavLogin from '../components/NavLogin';
import Notices from '../components/common/Notices/Notices';
import Logo from '../components/common/Logo';
import NavMain from '../components/NavMain';
import NavPage, { INavItem } from '../components/NavPage';

interface IMainLayout {
  children: ReactNode,
  navPage?: INavItem[]
}

const MainLayout : FC<IMainLayout> = ({ children, navPage }) => (
  <section className="layout main-layout">
    <header className="main-header main-layout__header">
      <Logo size="medium" className="main-header__logo" />
      <NavMain />
      <NavLogin className="main-layout__nav-login" />
    </header>
    <main className="main-layout__main">
      {navPage && <NavPage map={navPage} />}
      <Notices />
      <div className="separator" />
      {children}
    </main>
  </section>
);

export default MainLayout;
