import { Outlet } from 'react-router-dom';

const CustomerLayout = () => (
  <div>
    <nav>Customer Navbar</nav>
    <Outlet />
  </div>
);

export default CustomerLayout;
