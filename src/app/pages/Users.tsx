import React, {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import SimpleTable, { ISimpleTableHead } from '../components/common/SimpleTable';
import TableSceleton from '../components/common/Skeleton/TableSceleton';
import NavPage from '../components/NavPage';
import { useUser } from '../hooks/useUser';
import MainLayout from '../layouts/MainLayout';
import IUser from '../models/IUser';

const Users : FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { getUsers } = useUser();

  useEffect(() => {
    getUsers()
      .then((usrs) => setUsers(usrs))
      .catch(() => setUsers([]));
  }, []);

  const tHead = [
    { title: 'E-mail' },
    { title: 'Доступ' },
    { title: 'Имя' },
    { title: 'Активация' },
    { title: 'Активность' },
    { title: 'Регистрация' },
    { title: '-' },
  ];

  const tBody = useMemo(() => (!users
    ? []
    : users.map((user) => [
      user.email,
      user.role,
      user?.name,
      user?.isActivated ? 'да' : 'нет',
      user?.lastAction,
      user?.registered,
      'Удалить',
    ])), [users]);

  return (
    <MainLayout>
      <h1>Users</h1>
      <TableSceleton />
      {users && <SimpleTable head={tHead} body={tBody} />}
    </MainLayout>
  );
};

export default Users;
