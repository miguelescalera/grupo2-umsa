import axios from 'axios';
import { URL_SERVICE } from '../constants/constants';

const api = axios.create({
  baseURL: URL_SERVICE,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;