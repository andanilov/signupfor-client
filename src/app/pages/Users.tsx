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
import timeHasPassed from '../utils/timeHasPassed';
import { useNotices } from '../components/common/Notices';

const Users : FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const { getUsers, removeUser } = useUser();
  const { pushNotice } = useNotices();

  useEffect(() => {
    setTimeout(() => {
      getUsers()
        .then((usrs) => setUsers(usrs))
        .catch(() => setUsers(() => undefined));
    }, 2000);
  }, []);

  const removeUserHandle = (id: string) => {
    removeUser(id).then(() => {
      setUsers((usrs) => usrs?.filter(({ _id }) => id !== _id));
      pushNotice({ type: 'success', children: `Пользователь (id: ${id} успешно удалён!` });
    });
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
      user?.lastAction && timeHasPassed(user.lastAction),
      user?.registered && timeHasPassed(user.registered),
      <ButtonDelay
        handler={() => { removeUserHandle(user._id); }}
        className="btn btn--error btn--small"
      >
        Удалить
      </ButtonDelay>,
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
