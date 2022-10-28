import React, { FC } from 'react';
import { usePopUp } from './common/PopUp/usePopUp';
import PopUp from './common/PopUp';
import FormLogReg from './FormLogRegRem';

interface INavLogin {
  className?: string,
}

const NavLogin : FC<INavLogin> = ({ className = '' }) => {
  const { isOpened, toggleHandle } = usePopUp();

  return (
    <>
      <nav className={`nav-login ${className}`}>
        <button
          className="btn btn-link"
          onClick={toggleHandle}
          type="button"
        >
          Войти
        </button>
      </nav>
      <PopUp>
        <FormLogReg />
      </PopUp>
    </>
  );
};

export default NavLogin;
