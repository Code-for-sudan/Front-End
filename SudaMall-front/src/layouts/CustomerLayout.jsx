import { Outlet } from 'react-router-dom';
import CustomeBottomrNavbar from '../components/customer/customer-bottom-navbar/CustomeBottomrNavbar';

const CustomerLayout = () => (
  <div>
    <CustomeBottomrNavbar/>
    <Outlet />
  </div>
);

export default CustomerLayout;
