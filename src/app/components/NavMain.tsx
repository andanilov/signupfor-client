import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IoCalendarOutline,
  IoBriefcaseOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getCurrentUser } from '../store/authSlice';
import { getMavigatesMapByUser } from '../routes';
import NavLinkStyled from './common/NavLinkStyled';

const NavMain = () => {
  const user = useTypedSelector(getCurrentUser());
  const naviMap = getMavigatesMapByUser(user);
  return (
    <ul className="nav-main">
      {naviMap.USERS && (
        <li>
          <NavLinkStyled to={naviMap.USERS} className="nav-main__item">
            <IoPeopleOutline />
            Участники
          </NavLinkStyled>
        </li>
      )}
      {naviMap.EVENTS && (
        <li>
          <NavLinkStyled to={naviMap.EVENTS} className="nav-main__item nav-main__item--main">
            <IoCalendarOutline />
            Записи
          </NavLinkStyled>
        </li>
      )}
      {naviMap.APPOINTMENTS && (
        <li>
          <NavLinkStyled to={naviMap.APPOINTMENTS} className="nav-main__item nav-main__item--second">
            <IoBriefcaseOutline />
            События
          </NavLinkStyled>
        </li>
      )}
    </ul>
  );
};

export default NavMain;
