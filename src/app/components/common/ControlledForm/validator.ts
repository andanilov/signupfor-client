type ValidateResult = number | string | object | Array<object>;
export type Fnctn = (a?: ValidateResult) => string | false;

export interface IRuleArguments {
  msg?: string,
  len?: number,
  original?: string,
}

type Rule = (argv : IRuleArguments) => Fnctn;

export interface IRules {
  isRequired: Rule;
  isEmail: Rule;
  isYearBorn: Rule;
  isLink: Rule;
  min: Rule;
  max: Rule;
  isSimilar: Rule;
}

export const rules : IRules = {
  isRequired: ({ msg = 'Обязательное поле!' }) => (data) => {
    if (Array.isArray(data)) {
      return data.length ? false : msg;
    }
    if (typeof data === 'object') {
      return Object.keys(data).length ? false : msg;
    }
    return data ? false : msg;
  },

  isEmail: ({ msg = 'Неверный формат Email' }) => (data) => (String(data).toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ? false
    : msg),

  isYearBorn: ({ msg = 'Год рождения некорректен' }) => (data) => (data
    && (+data < (new Date().getFullYear() - 110) || +data >= new Date().getFullYear())
    ? msg
    : false),

  isLink: ({ msg = 'Неверный формат ссылки' }) => (data) => (String(data).toLowerCase()
    .match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
    ? false
    : msg),

  min: ({ len = 3, msg = 'Слишком короткая запись' }) => (data) => (String(data).trim().length >= len
    ? false
    : msg),

  max: ({ len = 3, msg = 'Слишком длинная запись' }) => (data) => (String(data).trim().length <= len
    ? false
    : msg),

  isSimilar: ({ original, msg = 'Данные не совпадают' }) => (data) => ((String(data).trim() === String(original).trim())
    ? false
    : msg),
};

export default (...fns : Fnctn[]) : Fnctn => (x) => {
  try {
    fns.reduce((a, f) => {
      const currentError : string | false = f(a);
      if (currentError) {
        throw new Error(currentError);
      }
      return a;
    }, x);
  } catch (e) {
    if (typeof e === 'string') {
      return e;
    }
    if (e instanceof Error) {
      return e.message;
    }
  }

  return '';
};
