import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderBottom from '../Header/HeaderBottom';
import Footer from '../Footer/Footer';

const UserLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <div className="flex flex-col">
        <Header />
        <HeaderBottom />
      </div>
      <div className="absolute w-full flex-grow top-28 lg:top-32">
        <div className="flex flex-col">
          <div className="py-6 md:py-8 min-h-[80vh]">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
