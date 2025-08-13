import { Outlet, useLocation } from 'react-router-dom';
import CustomeBottomrNavbar from '../components/customer/customer-bottom-navbar/CustomeBottomrNavbar';

const CustomerLayout = () => {
  const location = useLocation();

  // Only hide navbar on product details page
  const showNavbar = !/^\/customer\/Product\/\d+$/.test(location.pathname);

  return (
    <div className='relative min-h-screen w-full flex flex-col items-center'>
      <main className="flex-1 flex justify-center items-center w-full max-w-2xl mx-auto pb-20">
        <Outlet />
      </main>

      {showNavbar && (
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center z-20">
          <div className="w-full max-w-2xl">
            <CustomeBottomrNavbar />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerLayout;
