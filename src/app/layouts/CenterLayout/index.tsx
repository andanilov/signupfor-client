import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import NavLogin from '../../components/NavLogin';
import { ILayoutComponent } from '../types';
import ILocationState from '../../models/ILocation';
import Notices from '../../components/common/Notices/Notices';
// import NavigateService from '../../services/NavigateService';

const CenterLayout : FC<ILayoutComponent> = ({ children }) => (
  <section className="layout center-layout">
    <NavLogin className="center-layout__nav-login" />
    <main className="center-layout__main">
      {/* {location?.msg && <Notice type={location?.type}>{location.msg}</Notice>} */}
      <Notices />
      {children}
    </main>
  </section>
);

export default CenterLayout;
