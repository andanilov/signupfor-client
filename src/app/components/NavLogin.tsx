import React, { FC } from 'react';
import { usePopUp } from './common/PopUp/usePopUp';
import PopUp from './common/PopUp';
import FormLogReg from './FormLogRegRem';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IauthInitState } from '../store/authSlice';
import IUser from '../models/IUser';
import { useAuth } from '../hooks/useAuth';

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
              <button className="btn btn-link" type="button">{user.email}</button>
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
