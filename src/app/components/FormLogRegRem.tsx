import React, { FC, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
// import { useAuth } from '../../hooks/useAuth';
// import AuthService from '../../services/AuthService';
import ControlledForm, {
  TextField,
  Button,
  HandleSubmit,
} from './common/ControlledForm';
// import { useTypedDispatch } from '../../hooks/useTypedDispatch';

type MapItem = { title: string, button: string };
export interface ILogRegMap {
  log: MapItem,
  reg: MapItem,
  rem: MapItem,
}

const LogRegMap : ILogRegMap = {
  log: { title: 'Вход', button: 'Войти' },
  reg: { title: 'Регистрация', button: 'Зарегистрироваться' },
  rem: { title: 'Забыли пароль?', button: 'Напомнить' },
};

const FormLogReg: FC<{ status?: keyof ILogRegMap }> = ({ status = 'log' }) => {
  const [currentStatus, setCurrentStatus] = useState(status || 'log');
  const { handleLogin, handleRegistration, handleRemember } = useAuth();

  return (
    <div className="form-block">
      <header className="form-block__header">
        <div className="logo logo--small" />
        <div className="form-block__title">{LogRegMap[currentStatus].title}</div>
      </header>
      <>
        {currentStatus === 'log' && (
          <ControlledForm handleSubmit={handleLogin} className="form form-block__form">
            <TextField
              name="email"
              label="Email"
              rules={{
                isRequired: { msg: 'Введите Email' },
                isEmail: { msg: 'Неверный формат Email' },
              }}
              className="form-item form-block__form-item"
            />
            <TextField
              name="password"
              label="Пароль"
              type="password"
              rules={{ isRequired: { msg: 'Введите пароль!' } }}
              className="form-item form-block__form-item"
            />
            <Button type="submit" className="btn btn--success btn--large form-block__btn--wide">
              {LogRegMap[currentStatus].button}
            </Button>
          </ControlledForm>
        )}
      </>
      <>
        {currentStatus === 'reg' && (
          <ControlledForm handleSubmit={handleRegistration} className="form-block__form">
            <TextField
              name="email"
              label="Email"
              rules={{
                isRequired: { msg: 'Введите Email' },
                isEmail: { msg: 'Неверный формат Email' },
              }}
              className="form-item form-block__form-item"
            />
            <TextField
              name="name"
              label="Имя"
              className="form-item form-block__form-item"
            />
            <TextField
              name="password"
              label="Пароль"
              type="password"
              rules={{ isRequired: { msg: 'Введите пароль!' } }}
              className="form-item form-block__form-item"
            />
            <TextField
              name="password_repeat"
              label="Повтор пароля"
              type="password"
              rules={{ isSimilar: { original: 'password', msg: 'Пароли не совпадают!' } }}
              className="form-item form-block__form-item"
            />
            <Button type="submit" className="btn btn--success btn--large form-block__btn--wide">
              {LogRegMap[currentStatus].button}
            </Button>
          </ControlledForm>
        )}
      </>
      <>
        {currentStatus === 'rem' && (
          <ControlledForm handleSubmit={handleRemember} className="form-block__form">
            <TextField
              name="email"
              label="Email"
              rules={{
                isRequired: { msg: 'Введите Email' },
                isEmail: { msg: 'Неверный формат Email' },
              }}
              className="form-item form-block__form-item"
            />
            <Button type="submit" className="btn btn--success btn--large form-block__btn--wide">
              {LogRegMap[currentStatus].button}
            </Button>
          </ControlledForm>
        )}
      </>
      <nav className="form-block__nav">
        {Object.entries(LogRegMap).map(([status, { button }]) => (status !== currentStatus
          ? (
            <button
              className="btn btn-link"
              type="button"
              key={status}
              onClick={() => setCurrentStatus(status as keyof ILogRegMap)}
            >
              {button}
            </button>
          )
          : ''
        ))}
      </nav>
    </div>
  );
};

export default FormLogReg;
