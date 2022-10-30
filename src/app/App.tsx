import React, { FC, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { useTypedSelector } from './hooks/useTypedSelector';
import { getRoutesMapByUser } from './routes';
import PopUpProvider from './components/common/PopUp/usePopUp';
import { checkAuth } from './store/authSlice';
import './App.scss';

const App : FC = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useTypedDispatch();
  const router = createBrowserRouter(getRoutesMapByUser(undefined, undefined));

  useEffect(() => { dispatch(checkAuth()); }, []);

  return (user !== undefined
    ? (
      <PopUpProvider>
        <RouterProvider router={router} />
      </PopUpProvider>
    ) : <h1>Загрузка пользователя</h1>
  );
};

export default App;
