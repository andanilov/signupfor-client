import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate, redirect } from 'react-router-dom';
import { RouteUrls } from '../routes/index';
import { useTypedDispatch } from './useTypedDispatch';
import { HandleSubmit } from '../components/common/ControlledForm';
import AuthService from '../services/AuthService';
import StorageService from '../services/StorageService';
import { setUser, removeUser } from '../store/authSlice';
import { usePopUp } from '../components/common/PopUp/usePopUp';
import ILocationState from '../models/ILocation';
import { AuthResponse } from '../models/response/auth-response';

export function useAuth() {
  // const [loadingCheckAuth, setLoadingCheckAuth] = useState(false);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { closePopUp } = usePopUp();

  const handleLogin : HandleSubmit = async ({ email, password }, setErrors) => {
    try {
      const userData = await AuthService.login(email as string, password as string) as AuthResponse;
      StorageService.setAccesToken(userData.accessToken);
      dispatch(setUser(userData.user));
      closePopUp();
      // navigate(-1);
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg = e.response?.data?.message ?? 'Ошибка авторизации!';
        setErrors((prevError : Object) => ({ ...prevError, email: msg }));
      }
    }
  };

  // const handleRemember : HandleSubmit = async ({ email }, setErrors) => {
  //   try {
  //     // 1. Try to login
  //     await AuthService.remember(email as string);
  //     // 2. Go to main page
  //     navigate(RouteNames.LOGIN, { state: { msg: 'Ссылка на смену пароля была отправлена' } });
  //   } catch (e) {
  //     if (e instanceof AxiosError) {
  //       const msg = e.response?.data?.message ?? 'Ошибка сброса пароля!';
  //       setErrors((prevError : Object) => ({ ...prevError, email: msg }));
  //     }
  //   }
  // };

  const handleRegistration : HandleSubmit = async ({ email, password, name = '' }, setErrors) => {
    try {
      const userData = await AuthService.registration(email as string, password as string, name as string) as AuthResponse;
      StorageService.setAccesToken(userData.accessToken);
      dispatch(setUser(userData.user));
      closePopUp();
      navigate(RouteUrls.MAIN, {
        state: {
          type: 'success',
          msg: `
            ${userData.user?.name ? `${userData.user?.name}, ` : ''} 
            Поздравляем с успешной регистрацией!<br/>
            На Ваш email <strong>${userData.user.email}</strong> было отправлено письмо<br/>
            с инструкциями по активации Вашего аккаунта.`,
        } as ILocationState,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        const msg = e.response?.data?.message ?? 'Ошибка регистрации!';
        setErrors((prevError : Object) => ({ ...prevError, email: msg }));
      }
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     const userData = await AuthService.logout();
  //     // 2. Set token to storage
  //     StorageService.removeAccesToken();
  //     // 3. Set user to global state
  //     dispatch(removeUser());
  //     // 4. Go to main page
  //     redirect(RouteNames.MAIN);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return {
    // loadingCheckAuth,
    handleLogin,
    // handleLogout,
    handleRegistration,
    // handleRemember,
  };
}
