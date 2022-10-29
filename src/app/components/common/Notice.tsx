import React, { ReactNode, FC } from 'react';
import parse from 'html-react-parser';
import {
  IoWarningOutline,
  IoBookmarkOutline,
  IoWarning,
  IoCheckboxOutline,
} from 'react-icons/io5';
import { TNoticeType } from '../../models/TNoticeType';

interface INotice {
  children: ReactNode | string,
  type?: TNoticeType,
  size?: 'small' | 'medium' | 'large',
}

const iconMap = {
  success: <IoCheckboxOutline />,
  warning: <IoWarningOutline />,
  error: <IoWarning />,
  info: <IoBookmarkOutline />,
};

const Notice : FC<INotice> = ({ children, type = 'info', size = 'medium' }) => (
  <div className={`notice notice--${type} notice--${size}`}>
    {iconMap?.[type] && iconMap[type]}
    <div className="notice__content">
      {(typeof children === 'string')
        ? parse(children)
        : children}
    </div>
  </div>
);

export default Notice;
