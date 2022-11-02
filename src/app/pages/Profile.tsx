import React, { FC, useEffect } from 'react';
import ControlledForm, { Button, TextField } from '../components/common/ControlledForm';
import { useNotices } from '../components/common/Notices';
import { useAuth } from '../hooks/useAuth';
import { useTypedSelector } from '../hooks/useTypedSelector';
import MainLayout from '../layouts/MainLayout';
import { getCurrentUser } from '../store/authSlice';

const Profile : FC = () => {
  const user = useTypedSelector(getCurrentUser());
  const { pushNoticeUnique } = useNotices();
  const { handleRedact } = useAuth();

  useEffect(() => {
    !user?.isActivated && pushNoticeUnique({
      type: 'warning',
      children: `
        Для получения доступа к полному функционалу сервиса вам необходимо подтверить почту.<br/>
        На почтовый ящик <strong>${user?.email}</strong> было отправлено письмо с инструкциями.<br/>
        Если получить инструкции не удалось, воспользуйтесь формой "напомнить пароль" для сброса пароля и автоматического подтвеждения почтового ящика.`,
    });
  }, []);

  return (
    <MainLayout>
      <ControlledForm handleSubmit={handleRedact} className="form form--col2">
        <TextField
          name="email"
          label="Email"
          disabled
          value={user?.email}
          className="form-item form-block__form-item"
        />
        <TextField
          name="password"
          label="Новый пароль"
          type="password"
          className="form-item form-block__form-item"
        />
        <TextField
          name="name"
          label="Имя"
          value={user?.name}
          className="form-item form-block__form-item"
        />
        <TextField
          name="password_repeat"
          label="Повтор пароля"
          type="password"
          rules={{ isSimilar: { original: 'password', msg: 'Пароли не совпадают!' } }}
          className="form-item form-block__form-item"
        />
        <Button type="submit" className="btn btn--success btn--large form-block__btn">
          Изменить
        </Button>
      </ControlledForm>
    </MainLayout>
  );
};

export default Profile;
