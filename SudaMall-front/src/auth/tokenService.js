import axios from "axios";

const ACCESS_TOKEN_KEY = "access_token";

function removeAccessTokenFromAll() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}

let isRefreshing = false;
let refreshQueue = [];

/**
 * Process queued WebSocket or API requests waiting for a token refresh
 */
function processQueue(error, token = null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  refreshQueue = [];
}

export const TokenService = {
  getAccessToken() {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ||
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  },

  setAccessToken(access_token, remember = false) {
    removeAccessTokenFromAll();
    if (access_token) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(ACCESS_TOKEN_KEY, access_token);
    }
  },

  clearAccessToken() {
    removeAccessTokenFromAll();
  },

  isTokenExpired(token) {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },

  /**
   * Returns a fresh access token, refreshing it if expired
   */
  async getFreshAccessToken() {
    let token = this.getAccessToken();

    if (!token || this.isTokenExpired(token)) {
      if (isRefreshing) {
        // Queue requests while a refresh is in progress
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        const refreshApi = axios.create({
          baseURL: "https://sudamall.ddns.net/api/v1",
          withCredentials: true, // send cookies
        });

        const res = await refreshApi.post("/token/refresh/");
        const newToken = res.data.access;
        console.log("Token refreshed");

        const isRemembered = localStorage.getItem("remember_me") === "true";
        this.setAccessToken(newToken, isRemembered);

        processQueue(null, newToken);
        token = newToken;
      } catch (err) {
        processQueue(err, null);
        this.clearAccessToken();
        window.location.href = "/auth/login"; // redirect to login
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    return token;
  },
};
