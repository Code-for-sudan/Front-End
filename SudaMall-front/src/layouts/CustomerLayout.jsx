import { Outlet } from 'react-router-dom';
import CustomeBottomrNavbar from '../components/customer/customer-bottom-navbar/CustomeBottomrNavbar';

const CustomerLayout = () => (
  <div className='relative min-h-screen w-full flex flex-col items-center'>
    {/* Main content centered */}
    <main className="flex-1 flex justify-center items-center w-full max-w-3xl mx-auto pb-20">
      <Outlet />
    </main>

    {/* Fixed bottom navbar (already styled inside component) */}
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center z-20">
      <div className="w-full max-w-[450px]">
        <CustomeBottomrNavbar />
      </div>
    </div>

  </div>
);

export default CustomerLayout;
