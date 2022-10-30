import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface ILogo {
  size?: 'small' | 'medium' | 'large',
  className?: string
}

const Logo : FC<ILogo> = ({ size = 'medium', className = '' }) => (
  <Link to="/" className={`logo logo--${size} ${className}`}> </Link>
);

export default Logo;
