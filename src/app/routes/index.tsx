import React from 'react';
import { Navigate } from 'react-router';
import { UserRole } from '../models/IUser';
// Pages
import MainPage from '../pages/Main';
import ProfilePage from '../pages/Profile';
import UsersPage from '../pages/Users';
import AppointmentsPage from '../pages/Appointments';
import EventsPage from '../pages/Events';
import { TUserState } from '../store/authSlice';

// Types
interface IMap {
  [index: string]: {
    path: string,
    element: React.ReactNode,
    roles?: UserRole[],
  }
}
export interface ILocationState {
  login?: boolean
}

// Route Urls Map for router and navigation maps
export const routesMap : IMap = {
  // Main
  MAIN: { path: '/', element: <MainPage /> },
  MAIN_REDIRECT: { path: '*', element: <Navigate to="/" /> },
  // Auth
  PROFILE: { path: '/profile', element: <ProfilePage />, roles: ['admin', 'user'] },
  // Users
  USERS: { path: '/users', element: <UsersPage />, roles: ['admin'] },
  // Apppointments
  APPOINTMENTS: { path: '/appointments', element: <AppointmentsPage />, roles: ['admin', 'user'] },
  // Events
  EVENTS: { path: '/events', element: <EventsPage />, roles: ['admin', 'user'] },
  // Requests from API
  API_MSG: { path: '/msg/:message', element: <Navigate to="/" /> },
};

export const getRoutesMapByUser = (user: TUserState) => Object.keys(routesMap).reduce((newMap: Array<{}>, key) => {
  const route = routesMap[key];
  const allowByRole = route?.roles === undefined || (user?.role && route.roles.includes(user.role));
  const redirect = user?.role ? <Navigate to={routesMap.MAIN.path} /> : <Navigate to={routesMap.MAIN.path} state={{ login: true } as ILocationState} />;
  return [...newMap, { path: route.path, element: allowByRole ? route.element : redirect }];
}, []);

export interface INaviMap {
  [key : keyof typeof routesMap]: string | false
}

export const getMavigatesMapByUser = (user: TUserState) : INaviMap => Object.keys(routesMap).reduce((newMap, key) => {
  const route = routesMap[key];
  const allowByRole = route?.roles === undefined || (user?.role && route.roles.includes(user.role));
  return { ...newMap, [key]: allowByRole ? route.path : false };
}, {});
