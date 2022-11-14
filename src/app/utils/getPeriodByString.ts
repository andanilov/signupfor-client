// 5m -> 5 * 60 * 1000
const periodRules = {
  ms: 1000,
  get s() { return this.ms * 60; },
  get m() { return this.s * 60; },
  get h() { return this.m * 60; },
  get d() { return this.h * 24; },
};

export default function getPeriodByString(str: string) : number {
  const numStr = str.match(/\d+/);
  const num = numStr ? Number(numStr[0]) : 0;

  const timeTypeStr = str.match(/[A-Za-z]+/);
  const timeType = (timeTypeStr && timeTypeStr[0]) as keyof typeof periodRules;

  return (periodRules[timeType] && num) ? num * periodRules[timeType] : 0;
}
