type TRules = (sec: number) => boolean | string;

export default function (msec: number) : string {
  return [
    (sec: number) => sec < 60 && 'только что',
    (sec: number) => sec >= 60 && sec < 3600 && `${Math.floor(sec / 60)} мин назад`,
    (sec: number) => sec >= 3600 && sec < 86400 && `${Math.floor(sec / 3600)} ч назад`,
    (sec: number) => sec >= 86400 && sec < 2592000 && `${Math.floor(sec / 86400)} дн назад`,
    (sec: number) => sec >= 2592000 && sec < 31104000 && `${Math.floor(sec / 86400)} мес назад`,
    (sec: number) => sec >= 31104000 && 'очень давно',
  ].reduce((acc, rule) => rule((+new Date() - msec) / 1000) || acc, '');
}
