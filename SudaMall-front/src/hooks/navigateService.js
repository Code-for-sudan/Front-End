let navigateFunction;

export const setNavigate = (navigate) => {
  navigateFunction = navigate;
};

export const goToLogin = () => {
  if (navigateFunction) {
    navigateFunction('/login');
  }
};