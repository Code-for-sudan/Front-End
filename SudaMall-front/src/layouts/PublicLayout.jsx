import { Outlet } from 'react-router-dom';

const PublicLayout = () => (
  <div>
    {/* <nav>Public Navbar</nav> */}  { /* comment this line for consistency */}
    <Outlet />
  </div>
);

export default PublicLayout;
