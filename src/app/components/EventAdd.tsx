import React, { useEffect, useMemo, useRef } from 'react';
import ControlledForm, { Button, TextField } from './common/ControlledForm';
import config from '../../config';
import getPeriodByString from '../utils/getPeriodByString';
import { EventType } from './common/ControlledForm/types';

const EventAdd = () => {
  const [$start, $end] = [useRef(null), useRef(null)];
  const handleAdd = () => { };

  const getAllowPeriod = useMemo(() : [start: string, end: string] => {
    // Event can start only tomorrow
    if (new Date().getHours() + 2 > config.EVENT_BEFORE_START_H) {
      const dtStart = new Date(+new Date() + 86400000);
      const dtEnd = new Date(+new Date() + 86400000 + getPeriodByString(config.EVENT_HORIZONT_PERIOD));
      return [
        `${dtStart.getFullYear()}-${dtStart.getMonth() + 1}-${dtStart.getDate()}T${config.EVENT_START_H}:00`,
        `${dtEnd.getFullYear()}-${dtEnd.getMonth() + 1}-${dtEnd.getDate()}T${config.EVENT_BEFORE_START_H}:00`,
      ];
    }
    // Event can start today
    const dtStart = new Date(+new Date());
    const dtEnd = new Date(+new Date() + getPeriodByString(config.EVENT_HORIZONT_PERIOD));
    return [
      `${dtStart.getFullYear()}-${dtStart.getMonth() + 1}-${dtStart.getDate()}T${new Date().getHours() + 2}:00`,
      `${dtEnd.getFullYear()}-${dtEnd.getMonth() + 1}-${dtEnd.getDate()}T${config.EVENT_BEFORE_START_H}:00`,
    ];
  }, []);

  return (
    <ControlledForm handleSubmit={handleAdd} className="form">
      <TextField
        name="title"
        label="Название мероприятия"
        rules={{ isRequired: { msg: 'У мероприятия должно быть название!' } }}
        className="form-item col col-lg-2 form-block__form-item"
      />
      <TextField
        type="datetime-local"
        name="start"
        label="Начало мероприятия"
        rules={{ isRequired: { msg: 'Во сколько начало?' } }}
        className="form-item col col-sm-2 col-lg-4 form-block__form-item"
        min={getAllowPeriod[0]}
        max={getAllowPeriod[1]}
      />
      <TextField
        type="datetime-local"
        name="end"
        label="Окончание мероприятия"
        rules={{ isRequired: { msg: 'Во сколько окончание?' } }}
        className="form-item col col-sm-2 col-lg-4 form-block__form-item"
        min="2018-06-07T00:00"
        max="2018-06-14T00:00"
      />
      <div className="form-item col form-block__form-item">
        <Button type="submit" className="btn btn--success btn--large form-block__btn">
          Добавить мероприятие
        </Button>
      </div>
    </ControlledForm>
  );
};

export default EventAdd;
