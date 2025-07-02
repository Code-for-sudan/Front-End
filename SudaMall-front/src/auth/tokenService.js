/**const ACCESS_TOKEN_KEY = "accessToken";

function removeAccessTokenFromAll() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const TokenService = {
  getAccessToken() {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ||
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  },

  /**
   *  Remember to access the storage token based on the storage option.
   * - True: Stores it in localStorage (long session)
   * - False: Stores it in sessionStorage (short session)
   */
  /**setAccessToken(accessToken, remember = false) {
    removeAccessTokenFromAll();

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  clearAccessToken() {
    removeAccessTokenFromAll();
  },
};
*/const ACCESS_TOKEN_KEY = "access";
const REFRESH_TOKEN_KEY = "refresh";

function removeTokensFromAll() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export const TokenService = {
  getAccessToken() {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ||
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  },

  getRefreshToken() {
    return (
      localStorage.getItem(REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(REFRESH_TOKEN_KEY)
    );
  },

  setAccessToken(accessToken, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  setRefreshToken(refreshToken, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clearTokens() {
    removeTokensFromAll();
  },
};
