import React, { FC } from 'react';
import SimpleTable, { ISimpleTableHead } from '../components/common/SimpleTable';
import NavPage from '../components/NavPage';
import MainLayout from '../layouts/MainLayout';

const Users : FC = () => {
  const tHead = [
    { title: 'head1' },
    { title: 'head2' },
    { title: 'head3' },
  ];

  const tBody = [[1, 2, 3]];

  return (
    <MainLayout>
      <h1>Users</h1>
      <SimpleTable head={tHead} body={tBody} />
    </MainLayout>
  );
};

export default Users;
