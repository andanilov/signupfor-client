import React, { FC } from 'react';
import { ILabelWrapper } from './types';

const LabelWrapper: FC<ILabelWrapper> = ({ label, error, children }) => {
  children = (
    <div className={error && 'error'}>
      {children}
      {error && <div>{error}</div>}
    </div>
  );

  return label
    ? (
      <label>
        {label}
        {children}
      </label>
    )
    : <>{ children }</>;
};

export default LabelWrapper;
