import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import HeaderBottom from './HeaderBottom';

const Layout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <div className="flex flex-col">
        <Navbar />
        <HeaderBottom />
      </div>
      <div className="absolute w-full flex-grow py-6 md:py-8 top-28 lg:top-32">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
