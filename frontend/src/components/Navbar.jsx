import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { HiMenuAlt2 } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { navMenu } from '../constants';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const toggle = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="bg-white w-full fixed z-[1000]">
      <div className="container mx-auto px-4 md:px-2 flex items-center h-14 lg:h-16 justify-between ">
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
            <HiMenuAlt2 className="w-5 h-5" />
          )}
        </div>

        <nav
          className={`absolute flex flex-col p-2 lg:flex-row lg:items-center lg:static left-0 right-0 top-14 lg:top-16 bg-white w-full lg:opacity-100 translate duration-300 ${
            showNav ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end lg:gap-4 lg:w-full">
            {navMenu.length > 0 &&
              navMenu.map((menu) => (
                <div
                  key={menu.label}
                  className="sub-heading text-[#767676] hover:text-primeColor hover:font-semibold hover:underline underline-offset-[4px] decoration-[1px] md:border-r-[2px] border-r-gray-300 pr-8 pl-4"
                >
                  <Link to={menu.link}>
                    <span>{menu.label}</span>
                  </Link>
                </div>
              ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
