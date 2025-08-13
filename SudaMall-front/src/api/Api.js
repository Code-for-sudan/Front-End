import axios from "axios";
import { TokenService } from "../auth/tokenService";
import { goToLogin } from "../hooks/navigateService";

const api = axios.create({
  baseURL: "https://sudamall.ddns.net/api/v1",
  withCredentials: true,
});

// Flag and queue to handle refresh logic
let isRefreshing = false;
let failedQueue = [];

// Function to process queued requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor: attach access token
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

// Response interceptor: handle 401 and refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // Skip if refresh request itself failed
    if (originalConfig.url && originalConfig.url.includes("token/refresh")) {
      // Stop everything if refresh fails
      processQueue(err, null);
      TokenService.clearAccessToken();
      goToLogin();
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalConfig.headers["Authorization"] = `Bearer ${token}`;
            return api(originalConfig);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Use completely separate instance (no interceptors)
        const refreshApi = axios.create({
          baseURL: "https://sudamall.ddns.net/api/v1",
          withCredentials: true,
        });

        const res = await refreshApi.post("/token/refresh/");
        const access_token = res.data.access;
        console.log("Token refreshed");

        const isRemembered = localStorage.getItem("remember_me") === "true";
        TokenService.setAccessToken(access_token, isRemembered);

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        processQueue(null, access_token);
        return api(originalConfig);

      } catch (_error) {
        // Reject all queued requests so they don’t retry again
        processQueue(_error, null);
        TokenService.clearAccessToken();
        goToLogin();
        return Promise.reject(_error);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
)

export default api;
