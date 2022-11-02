import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type EventType = React.FormEvent<HTMLAnchorElement>;

interface INavLinkStyled {
  children: ReactNode | ReactNode[] | string,
  to?: string,
  className?: string,
  end?: boolean,
  handleClick?: Function
}

const NavLinkStyled : FC<INavLinkStyled> = ({
  children,
  to,
  end = false,
  className = '',
  handleClick = () => {},
}) => (
  <NavLink
    to={to || '#'}
    end={end}
    className={({ isActive }) => `${className} ${isActive ? 'active' : ''}`}
    onClick={(event: EventType) : void => { handleClick(event); }}
  >
    {children}
  </NavLink>
);

export default NavLinkStyled;
