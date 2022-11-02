import React, { FC } from 'react';
import NavPage from '../components/NavPage';
import MainLayout from '../layouts/MainLayout';

const Users : FC = () => (
  <MainLayout navPage={[{ title: 'Тестовая ссылка' }]}>
    <h1>Users</h1>
  </MainLayout>
);

export default Users;
