import axios from "axios";
import { TokenService } from "../auth/tokenService";
import { goToLogin } from '../hooks/navigateService';

/**
 * Axios instance configured for API communication with auth token and cookie support.
 */
const api = axios.create({
  baseURL: "https://sudamall.ddns.net/api/v1",
  withCredentials: true, // Allow cookies to be sent with cross-origin requests
});

/**
 * Request interceptor:
 * - Attaches access token to headers if available.
 */
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

/**
 * Response interceptor:
 * - Handles 401 Unauthorized responses by attempting token refresh.
 * - If refresh is successful, retries the original request.
 * - If refresh fails, clears token and redirects user to login.
 */
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // If unauthorized and not already retried
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        // Attempt to refresh access token
        const res = await api.post("/token/refresh/");
        const { access_token } = res.data;

        const isRemembered = localStorage.getItem("access_token") !== null;
        TokenService.setAccessToken(access_token, isRemembered);

        // Retry original request with new token
        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        originalConfig.headers["Authorization"] = `Bearer ${access_token}`;
        return api(originalConfig);

      } catch (_error) {
        // If token refresh fails, clear token and redirect to login
        TokenService.clearAccessToken();
        goToLogin();
        return Promise.reject(_error);
      }
    }

    // Other errors
    return Promise.reject(err);
  }
);

/** 
* Request a list of products based on search term.
*/

export const fetchProducts = async (query) => {
  try {

    const response = await axios.get(`https://sudamall.ddns.net/api/v1/search/products`, {
      params: { 
        q: query,
        page: 1,
       },
    });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch products')
    // }
    // const data = await response.json()
    const data = response.data.results;

    if (data.Response === 'False') {
      throw new Error(data.Error || 'No products found');
    }
    console.log(data.response)
    return { data }
  } catch(error) {
    console.log("Error fetching products:", error);
    return {
      error: error.message || 'An error occurred while fetching products'
    }
  }
}

export default api;



