import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="container bg-gray-600 px-2 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
