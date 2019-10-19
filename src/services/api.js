import axios from "axios";

import { getToken } from "./auth";

export const baseIp = 'casafrente1.ddns.net:3001';

const api = axios.create({
    baseURL: `http://${baseIp}/`,
  });

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
export default api;
