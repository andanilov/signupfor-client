import React, {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import SimpleTable, { ISimpleTableHead } from '../components/common/SimpleTable';
import TableSkeleton from '../components/common/Skeleton/TableSkeleton';
import NavPage from '../components/NavPage';
import { useUser } from '../hooks/useUser';
import MainLayout from '../layouts/MainLayout';
import IUser from '../models/IUser';
import config from '../../config';

const Users : FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { getUsers } = useUser();

  useEffect(() => {
    setTimeout(() => {
      getUsers()
        .then((usrs) => setUsers(usrs))
        .catch(() => setUsers([]));
    }, 2000);
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
      {users
        ? <SimpleTable head={tHead} body={tBody} />
        : (
          <TableSkeleton
            width={window.innerWidth > config.MAX_WIDTH
              ? config.MAX_WIDTH - 40
              : window.innerWidth - 40}
            rows={5}
            cols={7}
          />
        )}
    </MainLayout>
  );
};

export default Users;
