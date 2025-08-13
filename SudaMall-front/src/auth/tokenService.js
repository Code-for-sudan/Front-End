const ACCESS_TOKEN_KEY = "access_token";

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
   * Sets the access token in the appropriate storage.
   * @param {string} access_token - The token to store
   * @param {boolean} remember - If true, stores in localStorage (persistent)
   *                              If false, stores in sessionStorage (clears on tab close)
   */
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
};
