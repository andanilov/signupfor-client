import axios, { AxiosError } from 'axios';
import { useNotices } from '../components/common/Notices';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import { getCurrentUser } from '../store/authSlice';
import { useAuth } from './useAuth';
import { useTypedSelector } from './useTypedSelector';

type TError = Error | AxiosError;

export function useUser() {
  const { pushNotice } = useNotices();
  const { handleLogout } = useAuth();
  const currentUser = useTypedSelector(getCurrentUser());

  const getUsers = async () => {
    try {
      const users = await UserService.getUsers();
      return users;
    } catch (e) {
      setError(e as TError);
    }
  };

  const removeUser = async (_id: string) => {
    try {
      const user = await UserService.removeUser(_id);
      if (_id === currentUser?._id) return await handleLogout();
      user?.email && pushNotice({ type: 'success', children: `Пользователь ${user.email} успешно удалён!` });
      return user;
    } catch (e) {
      setError(e as TError);
    }
  };

  function setError(error: TError, msg?: string) {
    if (axios.isAxiosError(error) && error.response?.status !== 401) {
      const { message } = error.response?.data as { message: string };
      pushNotice({ type: 'error', children: msg || message || 'Что-то пошло не так!', size: 'small' });
    }
    throw new Error();
  }

  return {
    getUsers,
    removeUser,
  };
}
