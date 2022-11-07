import { ApiRoutes } from '../http/api-routes';
import api from '../http/api';
// import { ApiRoutes } from '../http/api-routes';
// import { AuthResponse } from '../models/response/auth-response';
// import appConfig from '../../config';
import IUser from '../models/IUser';

export default class UserService {
  static async getUsers(): Promise<IUser[]> {
    const { data } = await api.get<IUser[]>(ApiRoutes.USERS, {
      params: {
        sortCol: 'email',
        sortDirectiorn: 1,
        limit: 100,
      },
    });
    return data;
  }

  static async removeUser(_id: string) {
    const { data } = await api.delete<IUser>(`${ApiRoutes.USER}/${_id}`);
    return data;
  }
}
