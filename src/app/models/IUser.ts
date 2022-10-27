export type UserRole = 'admin' | 'user';

export interface IUser {
  _id: string,
  email: string,
  name?: string,
  isActivated: boolean,
  roles: UserRole,
}
