import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <Navbar />
      <div className="absolute w-full flex-grow py-6 md:py-8 top-14 lg:top-16">
        <div className="container mx-auto p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
