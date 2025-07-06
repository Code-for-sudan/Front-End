import { Outlet } from 'react-router-dom';
import CustomerNav from '../components/customer/CustomerNav';

const CustomerLayout = () => (
  <div>
    <CustomerNav />
    <Outlet />
  </div>
);

export default CustomerLayout;
