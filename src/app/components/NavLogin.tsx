import React, { FC } from 'react';
import { usePopUp } from '../hooks/usePopUp';
import PopUp from './PopUp';

interface INavLogin {
  className?: string,
}

const NavLogin : FC<INavLogin> = ({ className }) => {
  const { isOpened, toggleHandle } = usePopUp();

  return (<>
    <nav className={`nav-login ${className}`}>
      <button className="btn btn-link" onClick={toggleHandle}>Войти</button>
    </nav>
    <PopUp>
      Некий текст
    </PopUp>
  </>);
};

export default NavLogin;
