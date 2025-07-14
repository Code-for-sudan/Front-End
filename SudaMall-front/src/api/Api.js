import axios from "axios";
import { TokenService } from "../auth/tokenService";
import { goToLogin } from '../hooks/navigateService';

const api = axios.create({
  baseURL: "https://sudamall.ddns.net/api/v1",
    withCredentials: true, // Enable cookies to be sent with requests

});

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const res = await api.post("/token/refresh/");  

        const { access_token } = res.data;

        const isRemembered = localStorage.getItem("access_token") !== null;
        TokenService.setAccessToken(access_token, isRemembered);

        // Update header and retry original request
        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        originalConfig.headers["Authorization"] = `Bearer ${access_token}`;
        return api(originalConfig);
      } catch (_error) {
        TokenService.clearAccessToken();
        goToLogin();
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  }
);

export default api;