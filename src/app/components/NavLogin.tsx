import React, { FC } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { usePopUp } from './common/PopUp/usePopUp';
import PopUp from './common/PopUp';
import FormLogReg from './FormLogRegRem';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useAuth } from '../hooks/useAuth';
import { routesMap } from '../routes';
import NavigateService from '../services/NavigateService';
import NavLinkStyled from './common/NavLinkStyled';

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
              <NavLinkStyled to={routesMap.PROFILE.path} className="nav-item nav-login__item">
                { user.name || user.email }
              </NavLinkStyled>
              <IoLogOutOutline onClick={handleLogout} className="nav-item nav-login__item--icon" />
            </>
          )
          : (<button className="btn btn-link" onClick={toggleHandle} type="button">Войти</button>)}
      </nav>
      <PopUp isOpenedDefault={NavigateService.shiftLocationState()?.login}>
        <FormLogReg />
      </PopUp>
    </>
  );
};

export default NavLogin;
