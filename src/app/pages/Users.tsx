import React, {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import SimpleTable, { ISimpleTableHead } from '../components/common/SimpleTable';
import TableSkeleton from '../components/common/Skeleton/TableSkeleton';
import { useUser } from '../hooks/useUser';
import MainLayout from '../layouts/MainLayout';
import IUser from '../models/IUser';
import config from '../../config';
import ButtonDelay from '../components/common/ControlledForm/ButtonDelay';

const Users : FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { getUsers, removeUser } = useUser();

  useEffect(() => {
    setTimeout(() => {
      getUsers()
        .then((usrs) => setUsers(usrs))
        .catch(() => setUsers([]));
    }, 2000);
  }, []);

  const removeUserHandle = (id: string) => {
    removeUser(id).then(() => { setUsers((usrs) => usrs?.filter(({ _id }) => id !== _id)); });
  };

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
      <ButtonDelay handler={() => { console.log('!! - ', user._id); }}>
        Удалить
      </ButtonDelay>,
      // <button className="btn btn-link" onClick={() => removeUserHandle(user._id)} type="button">Удалить</button>,
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
