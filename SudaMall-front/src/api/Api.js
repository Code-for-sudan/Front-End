import axios from "axios";
import { TokenService } from "../auth/tokenService";
import { goToLogin } from '../hooks/navigateService';

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
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
        const refreshToken = TokenService.getLocalRefreshToken();
        const res = await api.post("/auth/token/refresh", {
          refreshToken,
        });

        const { accessToken } = res.data;
        TokenService.setTokens(accessToken, true);

        // Update header and retry original request
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalConfig);
      } catch (_error) {
        TokenService.clearTokens();
        goToLogin();
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  }
);

export default api;