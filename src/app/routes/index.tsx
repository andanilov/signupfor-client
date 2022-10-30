import React from 'react';
import { Navigate } from 'react-router';
import { UserRole } from '../models/IUser';

import MainPage from '../pages/Main';
import AccountPage from '../pages/Account';
import Message from '../pages/Message';

export enum RouteUrls {
  MAIN = '/',
  ACCOUNT = '/account',

  API_MSG = '/msg/:message',
}

interface IRoute {
  path: RouteUrls,
  element: React.ReactNode,
  isActivated?: boolean,
  roles?: UserRole[]
}

const routesMap : IRoute[] = [
  { path: RouteUrls.ACCOUNT, element: <AccountPage /> },
  // { path: RouteUrls.ACCOUNT, element: <AccountPage />, roles: ['admin', 'user'] },
  { path: RouteUrls.MAIN, element: <MainPage /> },

  { path: RouteUrls.API_MSG, element: <Message /> },

];

export const getRoutesMapByUser = (role: UserRole|undefined, isActivated: boolean|undefined) => (
  routesMap.map(({ path, element, ...rest }) => {
    const allowByRole = rest?.roles === undefined || rest.roles.includes(role as UserRole);
    const allowByActivated = rest?.isActivated === undefined || rest.isActivated === isActivated;
    const redirectElement = role
      ? <Navigate to={RouteUrls.MAIN} />
      : <Navigate to={RouteUrls.MAIN} />;

    return ({
      path,
      element: allowByRole && allowByActivated ? element : redirectElement,
    });
  })
);
