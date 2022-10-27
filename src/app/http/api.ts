import axios from 'axios';
import appConfig from '../../config';

const api = axios.create({
  withCredentials: true, // Add cookie to every request
  baseURL: appConfig.API_URL,
});

export default api;
