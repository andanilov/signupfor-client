import React, { FC } from 'react';
import NavLogin from '../../components/NavLogin';
import { ILayoutComponent } from '../types';

const CenterLayout : FC<ILayoutComponent> = ({ children }) => (
  <section className="layout center-layout">
    <NavLogin className="center-layout__nav-login" />
    {/* <nav className="nav-login center-layout__nav-login">
      Login
    </nav> */}
    <main className="center-layout__main">
      {children}
    </main>
  </section>
);

export default CenterLayout;
