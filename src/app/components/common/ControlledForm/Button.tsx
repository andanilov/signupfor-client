import React from 'react';
import { IButton } from './types';

const Button = ({
  children,
  type,
  loading,
  className,
  ...rest
} : IButton) => (
  <button
    {...rest}
    type={type || 'button'}
    disabled={loading || false}
    className={className || ''}
  >
    {loading ? 'Загрузка!' : children}
  </button>
);

export default Button;
