import axios from 'axios';
import api from '../http/api';
import { ApiRoutes } from '../http/api-routes';
import { AuthResponse } from '../models/response/auth-response';
import appConfig from '../../config';
import IUser from '../models/IUser';

export default class AuthService {
  static async checkAuth(): Promise<AuthResponse> {
    const { data } = await axios.get<AuthResponse>(appConfig.API_URL + ApiRoutes.REFRESH, {
      withCredentials: true, // Add cookie to every request
    });
    return data;
  }

  static async registration(email: string, password: string, name?: string) {
    const { data } = await api.post<AuthResponse>(ApiRoutes.REGISTER, { email, password, name: name || '' });
    return data;
  }

  static async login(email: string, password: string) {
    const { data } = await api.post<AuthResponse>(ApiRoutes.LOGIN, { email, password });
    return data;
  }

  static async remember(email: string) {
    const { data } = await api.post(ApiRoutes.REMEMBER, { email });
    return data;
  }

  static async logout() {
    await api.post(ApiRoutes.LOGOUT);
  }

  static async redact(name: string, password: string) {
    const { data } = await api.post<IUser>(ApiRoutes.REDACT, { name, password });
    return data;
  }
}
