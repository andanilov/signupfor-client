import React, { FC } from 'react';
import { ILabelWrapper } from './types';

const LabelWrapper: FC<ILabelWrapper> = ({
  label,
  error,
  className,
  children,
}) => {
  children = (
    <div className={`${error ? 'error' : ''} ${!label ? (className || '') : ''}`}>
      {children}
      {error && <div>{error}</div>}
    </div>
  );

  return label
    ? (
      <label className={className || ''}>
        {label}
        {children}
      </label>
    )
    : <>{ children }</>;
};

export default LabelWrapper;
