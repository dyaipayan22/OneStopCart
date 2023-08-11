import { useState } from 'react';
import { motion } from 'framer-motion';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiUser } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt2 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { navMenu } from '../constants';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sideNav, setSideNav] = useState(false);

  const toggle = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };
  return (
    <div className="w-full h-16 bg-white sticky top-0 border-b-[1px] z-50 border-b-gray-200">
      <nav className="h-full px-4 container mx-auto ">
        <div className="flex items-center justify-between h-full">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              width={30}
              height={30}
              className="inline-flex p-2 w-12 h-12"
            />
          </Link>
          <div
            className="md:hidden cursor-pointer bg-slate-500"
            onClick={toggle}
          >
            {showMenu ? (
              <MdClose className="w-6 h-6" />
            ) : (
              <HiMenuAlt2 className="w-6 h-6" />
            )}
          </div>
          <motion.ul
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className={`absolute flex flex-col p-2 md:flex-row md:static left-0 right-0 top- 16 md:opacity-100 items-center w-auto gap-2 ${
              showMenu ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <>
              {navMenu?.map((item) => (
                <Link
                  to={item.link}
                  key={item.id}
                  className="flex font-normal hover:font-semibold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 font-Poppins"
                >
                  <li>{item.label}</li>
                </Link>
              ))}
            </>
          </motion.ul>

          {/* {sideNav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full relative"
              >
                <div className="w-full h-full bg-primeColor p-6">
                  <img
                    className="w-12 h-12 mb-6"
                    src="/logo.png"
                    alt="logoLight"
                  />
                  <ul className="text-gray-200 flex flex-col gap-2">
                    {navMenu?.map((item) => (
                      <li
                        className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        key={item.id}
                      >
                        <Link to={item.link} onClick={() => setSideNav(false)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  onClick={() => setSideNav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                >
                  <MdClose />
                </span>
              </motion.div>
            </div>
          )} */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
