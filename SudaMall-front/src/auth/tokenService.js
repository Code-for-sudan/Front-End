

function removeAccessTokenFromAll() {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
}

export const TokenService = {
  getAccessToken() {
    return (
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
    );
  },

  /**
   *  Remember to access the storage token based on the storage option.
   * - True: Stores it in localStorage (long session)
   * - False: Stores it in sessionStorage (short session)
   */
  setAccessToken(access_token, remember = false) {
    removeAccessTokenFromAll();

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("access_token", access_token);
  },

  clearAccessToken() {
    removeAccessTokenFromAll();
  },
};
