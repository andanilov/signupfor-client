import { ReactNode } from 'react';
import { TNoticeType } from "./TNoticeType";

export default interface ILocationState {
  msg?: ReactNode | string,
  type?: TNoticeType
}
