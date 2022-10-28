import React, { useEffect } from 'react';
import LabelWrapper from '../LabelWrapper';
import { ITextField } from '../types';

const TextField = ({
  name,
  label,
  type,
  error,
  className,
  ...props
} : ITextField) => (
  <LabelWrapper label={label} error={error}>
    <input
      type={type || 'text'}
      name={name}
      autoComplete={type === 'password' ? 'on' : 'off'}
      className={className || ''}
      {...props}
    />
  </LabelWrapper>
);

export default TextField;
