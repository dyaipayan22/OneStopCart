import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

const AdminLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <Header />
      <div className="absolute w-full flex-grow py-6 md:py-8 top-14 lg:top-16">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
