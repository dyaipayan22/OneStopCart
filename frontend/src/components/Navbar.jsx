import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiUser } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { NavMenu } from '../constants';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggle = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="bg-white w-full fixed shadow-sm z-[1000]">
      <div className="container px-4 md:px-2 mx-auto flex items-center h-14 lg:h-16 justify-between">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="inline-flex p-2 w-12 h-12"
          />
        </Link>
        <div className="lg:hidden" onClick={toggle}>
          {showNav ? (
            <AiOutlineClose className="w-5 h-5" />
          ) : (
            <RxHamburgerMenu className="w-5 h-5" />
          )}
        </div>

        <nav
          className={`absolute flex flex-col p-2 lg:flex-row lg:items-center lg:static left-0 right-0 top-14 lg:top-16 bg-white w-full lg:opacity-100 translate duration-300 ${
            showNav ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 lg:w-full">
            {NavMenu.length > 0 &&
              NavMenu.map((menu) => (
                <div key={menu.label} className="p-2 rounded-md">
                  <Link to={menu.link}>
                    <span className="sub-heading">{menu.label}</span>
                  </Link>
                </div>
              ))}
          </div>

          <div className="flex flex-col p-2 gap-4 lg:flex-row lg:gap-8 lg:items-center">
            <AiOutlineShoppingCart className="w-5 h-5" />
            <FiUser className="w-5 h-5" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
