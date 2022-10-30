import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { usePopUp } from './common/PopUp/usePopUp';
import PopUp from './common/PopUp';
import FormLogReg from './FormLogRegRem';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IauthInitState } from '../store/authSlice';
import IUser from '../models/IUser';
import { useAuth } from '../hooks/useAuth';
import { RouteUrls } from '../routes';

interface INavLogin {
  className?: string,
}

const NavLogin : FC<INavLogin> = ({ className = '' }) => {
  const { isOpened, toggleHandle } = usePopUp();
  const { user } = useTypedSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  return (
    <>
      <nav className={`nav-login ${className}`}>
        {user
          ? (
            <>
              <Link to={RouteUrls.ACCOUNT}>{user.email}</Link>
              <Link to={RouteUrls.MAIN}>Главная</Link>
              <button className="btn btn-link" onClick={handleLogout} type="button">Выйти</button>
            </>
          )
          : (<button className="btn btn-link" onClick={toggleHandle} type="button">Войти</button>)}
      </nav>
      <PopUp>
        <FormLogReg />
      </PopUp>
    </>
  );
};

export default NavLogin;
