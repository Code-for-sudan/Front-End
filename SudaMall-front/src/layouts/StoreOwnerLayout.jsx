import { Outlet } from 'react-router-dom';

const StoreOwnerLayout = () => (
  <div>
    <nav>Store Owner Navbar</nav>
    <Outlet />
  </div>
);

export default StoreOwnerLayout;
