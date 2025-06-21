import { Outlet } from 'react-router-dom';
import StoreOwnerNav from '../components/store-owner/StoreOwnerNav';

const StoreOwnerLayout = () => (
  <div>
    <StoreOwnerNav />
    <Outlet />
  </div>
);

export default StoreOwnerLayout;
