import { Outlet, useLocation } from 'react-router-dom';
import StoreOwnerNav from '../components/store-owner/StoreOwnerNav';

const StoreOwnerLayout = () => {
  const location = useLocation();

  // Hide nav only when inside dashboard subroutes (not main dashboard)
  const hideNav = /^\/store-owner\/[^/]+\/dashboard\/.+/.test(location.pathname) || /^\/store-owner\/[^/]+\/products/.test(location.pathname);

  return (
    <>
      {!hideNav && <StoreOwnerNav />}
      <Outlet />
    </>
  );
};

export default StoreOwnerLayout;
