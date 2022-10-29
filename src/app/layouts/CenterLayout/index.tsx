import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import NavLogin from '../../components/NavLogin';
import { ILayoutComponent } from '../types';
import ILocationState from '../../models/ILocation';
import Notice from '../../components/common/Notice';
import NavigateService from '../../services/NavigateService';

const CenterLayout : FC<ILayoutComponent> = ({ children }) => {
  const location = NavigateService.shiftLocationState();

  return (
    <section className="layout center-layout">
      <NavLogin className="center-layout__nav-login" />
      <main className="center-layout__main">
        {location?.msg && <Notice type={location?.type}>{location.msg}</Notice>}
        {children}
      </main>
    </section>
  );
};

export default CenterLayout;
