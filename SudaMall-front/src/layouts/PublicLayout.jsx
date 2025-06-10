import { Outlet } from 'react-router-dom';

const PublicLayout = () => (
  <div>
    {/* <nav>Public Navbar</nav> */}
    <Outlet />
  </div>
);

export default PublicLayout;
