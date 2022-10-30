import React, { FC, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { useTypedSelector } from './hooks/useTypedSelector';
import { getRoutesMapByUser } from './routes';
import PopUpProvider from './components/common/PopUp/usePopUp';
import { checkAuth } from './store/authSlice';
import './App.scss';
import NoticesProvider from './components/common/Notices';

const App : FC = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useTypedDispatch();
  const router = createBrowserRouter(getRoutesMapByUser(undefined, undefined));

  useEffect(() => { dispatch(checkAuth()); }, []);

  return (user !== undefined
    ? (
      <NoticesProvider>
        <PopUpProvider>
          <RouterProvider router={router} />
        </PopUpProvider>
      </NoticesProvider>
    ) : <h1>Загрузка пользователя</h1>
  );
};

export default App;
