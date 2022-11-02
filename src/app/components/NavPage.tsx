import React, { FC } from 'react';
import NavLinkStyled from './common/NavLinkStyled';

export interface INavItem {
  title: string,
  to?: string,
  handleClick?: Function
}

const NavPage : FC<{ map: INavItem[] }> = ({ map }) => (
  <nav className="nav-page">
    {map.map(({ title, to, handleClick = () => {} }) => (
      <NavLinkStyled
        key={title}
        to={to}
        handleClick={handleClick}
        className="nav-page__item"
      >
        {title}
      </NavLinkStyled>
    ))}
  </nav>
);

export default NavPage;
