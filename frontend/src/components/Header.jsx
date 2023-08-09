import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FiUser } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { NavMenu } from '../constants';

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const toggle = () => {
    setShowNav(!showNav);
  };
  return (
    // <div className="bg-[#356D65] text-[#FFFFFF] w-full my-auto sticky shadow-md py-2 md:flex md:items-center justify-between md:justify-normal ">
    //   <div className="flex items-center  justify-between w-full md:w-auto">
    //     <Link to="/">
    //       <img src="/logo.png" alt="Logo" width={30} height={30} />
    //     </Link>

    // <div className="md:hidden" onClick={toggle}>
    //   {showNav ? <AiOutlineClose /> : <RxHamburgerMenu />}
    // </div>
    //   </div>

    //   <div
    //     className={`w-full top-14 p-4 absolute  md:static md:flex md:items-center md:justify-between z-[-1] md:z-auto ${
    //       showNav ? 'md:opacity:100' : 'hidden'
    //     }`}
    //   >
    //     <div className="flex flex-col gap-2 md:flex-row md:gap-4">
    // {NavMenu.length > 0 &&
    //   NavMenu.map((menu) => (
    //     <Link to={menu.link} key={menu.label}>
    //       <span>{menu.label}</span>
    //     </Link>
    //   ))}
    //     </div>
    // <div className="flex flex-col gap-2 pt-2 md:flex-row md:gap-4 md:items-center">
    //   <AiOutlineShoppingCart />
    //   <FiUser />
    // </div>
    //   </div>
    // </div>

    <div className="bg-white fixed top-0 left-0 right-0 flex items-center z-[1000] px-[7%]">
      <Link to="/">
        <img src="/logo.png" alt="Logo" width={30} height={30} />
      </Link>

      {/* <div className="" onClick={toggle}>
        {showNav ? <AiOutlineClose /> : <RxHamburgerMenu />}
      </div> */}
      <ul>
        {NavMenu.length > 0 &&
          NavMenu.map((menu) => (
            <Link to={menu.link} key={menu.label}>
              <li className="relative float-left p-5">
                <span className="">{menu.label}</span>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default Header;

/**
 <div className="flex flex-col md:flex-row md:gap-4">
          {NavMenu.length > 0 &&
            NavMenu.map((menu) => (
              <Link to={menu.link} key={menu.label}>
                <span>{menu.label}</span>
              </Link>
            ))}
        </div>
        <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
          <AiOutlineShoppingCart />
          <FiUser />
        </div>

 */
