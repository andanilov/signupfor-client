import { INotice } from './Notice';
import config from '../../../../config';

interface IApiNoticeMap {
  [key: string]: INotice
}

const apiNoticeMap : IApiNoticeMap = {
  'User activated successfully': { type: 'success', children: 'Отлично! Активация почтового ящика прошла успешно.<br/>Теперь вам доступен весь функционал!' },
  'User was not activated': { type: 'error', children: `Активировать почтовый адрес не удалось.<br/>Попробуйте снова или обратитесь к <a href="mailto:${config.ADMIN_EMAIL}">администратору</a>` },
  'User password was changed successfully': { type: 'success', children: 'Ваш пароль был успешно изменён!<br/>Новый пароль отправлен на ваш почтовый адрес!' },
  'User password was not changed': { type: 'error', children: `Пароль сбросить не удалось.<br/>Возможно, ссылка сброса пароля неверная или устарела!<br/>Попробуйте снова или обратитесь к <a href="mailto:${config.ADMIN_EMAIL}">администратору</a>` },
};

export default apiNoticeMap;
