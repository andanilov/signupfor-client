import React, { FC, ReactNode } from 'react';
import NavLogin from '../components/NavLogin';
import { ILayoutComponent } from './types';
import Notices from '../components/common/Notices/Notices';

export interface ICenterLayout {
  children: ReactNode
}

const CenterLayout : FC<ICenterLayout> = ({ children }) => (
  <section className="layout center-layout">
    <NavLogin className="center-layout__nav-login" />
    <main className="center-layout__main">
      <Notices />
      {children}
    </main>
  </section>
);

export default CenterLayout;
