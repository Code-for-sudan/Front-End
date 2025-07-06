const ACCESS_TOKEN_KEY = "access";

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
  setAccessToken(accessToken, remember = false) {
    removeAccessTokenFromAll();

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  clearAccessToken() {
    removeAccessTokenFromAll();
  },
};
