import React, { FC } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Notice from '../components/common/Notice';
import CenterLayout from '../layouts/CenterLayout';
import { TNoticeType } from '../models/TNoticeType';
import config from '../../config';

interface IMessageList {
  [index: string]: {
    type: TNoticeType,
    msg: string
  }
}

const messageList : IMessageList = {
  user_activated: { type: 'success', msg: 'Учётная запись активирована!' },
  user_activated_false: { type: 'error', msg: `Произошла ошибка активации учётной записи!<br/>Обратитесь к <a href="mailto:${config.ADMIN_EMAIL}?subject=Активация">администратору</a>` },

  user_password_change: { type: 'success', msg: 'Ваш пароль успешно изменён. Новый пароль отправлен на почту!' },
  user_password_change_false: { type: 'error', msg: `Произошла ошибка изменения пароля!<br/>Обратитесь к <a href="mailto:${config.ADMIN_EMAIL}?subject=парольцвуамцуац">администратору</a>` },
};

interface IMessageParams {
  message?: keyof typeof messageList
}

const Message : FC = () => {
  const { message } = useParams() as IMessageParams;

  if (!message || !messageList?.[message]) return <Navigate to="/" />;

  return (
    <CenterLayout>
      <Logo size="large" />
      <Notice type={messageList[message].type}>
        {messageList[message].msg}
      </Notice>
    </CenterLayout>
  );
};

export default Message;
