import { Outlet, useLocation } from 'react-router-dom';
import StoreOwnerNav from '../components/store-owner/StoreOwnerNav';
import { useSelector } from 'react-redux';
import { SelectAddProduct } from '../app/AppStats';
import { AddProduct } from '../pages/store-owner/products';

const StoreOwnerLayout = () => {
  const location = useLocation();
  const AddingProduct = useSelector(SelectAddProduct);

  // Hide nav only when inside dashboard subroutes (not main dashboard)
  const hideNav = /^\/store-owner\/[^/]+\/dashboard\/.+/.test(location.pathname) 
                || /^\/store-owner\/[^/]+\/products/.test(location.pathname) 
                || /^\/store-owner\/[^/]+\/chats\/.+/.test(location.pathname);

  return (
    <>
      {AddingProduct && <AddProduct />}
      {!hideNav && <StoreOwnerNav />}
      <Outlet />
    </>
  );
};

export default StoreOwnerLayout;
