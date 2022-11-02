import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate, redirect } from 'react-router-dom';
import { routesMap } from '../routes';
import { useTypedDispatch } from './useTypedDispatch';
import { HandleSubmit } from '../components/common/ControlledForm';
import AuthService from '../services/AuthService';
import StorageService from '../services/StorageService';
import { setUser, removeUser } from '../store/authSlice';
import { usePopUp } from '../components/common/PopUp/usePopUp';
import { AuthResponse } from '../models/response/auth-response';
import { useNotices } from '../components/common/Notices';

export function useAuth() {
  // const [loadingCheckAuth, setLoadingCheckAuth] = useState(false);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { closePopUp } = usePopUp();
  const { pushNotice } = useNotices();

  const handleLogin : HandleSubmit = async ({ email, password }, setErrors) => {
    try {
      const userData = await AuthService.login(email as string, password as string) as AuthResponse;
      StorageService.setAccesToken(userData.accessToken);
      dispatch(setUser(userData.user));
      closePopUp();
      navigate(routesMap.PROFILE.path);
    } catch (e) {
      console.log('Error!', e);
      if (e instanceof AxiosError) {
        const msg = e.response?.data?.message ?? 'Ошибка авторизации!';
        setErrors((prevError : Object) => ({ ...prevError, email: msg }));
      }
    }
  };

  const handleRemember : HandleSubmit = async ({ email }, setErrors) => {
    try {
      const response = await AuthService.remember(email as string);
      console.log('response = ', response);
      pushNotice({ type: 'success', children: `Инструкции по смене пароля отправлены на почтовый ящик <strong>${email}</strong>!` });
      closePopUp();
    } catch (e) {
      console.log('Error!');
      if (e instanceof AxiosError) {
        const msg = e.response?.data?.message ?? 'Ошибка сброса пароля!';
        setErrors((prevError : Object) => ({ ...prevError, email: msg }));
      }
    }
  };

  const handleRegistration : HandleSubmit = async ({ email, password, name = '' }, setErrors) => {
    try {
      const userData = await AuthService.registration(email as string, password as string, name as string) as AuthResponse;
      StorageService.setAccesToken(userData.accessToken);
      dispatch(setUser(userData.user));
      pushNotice({
        type: 'success',
        children: `
          ${userData.user?.name ? `${userData.user?.name}, ` : ''} 
          Поздравляем с успешной регистрацией!<br/>
          На Ваш email <strong>${userData.user.email}</strong> было отправлено письмо<br/>
          с инструкциями по активации Вашего аккаунта.`,
      });
      closePopUp();
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg = e.response?.data?.message ?? 'Ошибка регистрации!';
        setErrors((prevError : Object) => ({ ...prevError, email: msg }));
      }
    }
  };

  const handleLogout = async () => {
    try {
      const userData = await AuthService.logout();
      StorageService.removeAccesToken();
      dispatch(removeUser());
      navigate(routesMap.MAIN.path);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    // loadingCheckAuth,
    handleLogin,
    handleLogout,
    handleRegistration,
    handleRemember,
  };
}
