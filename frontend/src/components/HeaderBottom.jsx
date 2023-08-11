import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { HiMenuAlt2 } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const HeaderBottom = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { userInfo, loading } = useSelector((state) => state.user);
  const user = userInfo;
  console.log(user);

  return (
    <div className="w-full bg-[#F5F5F3] top-14 lg:top-16 relative">
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row md:items-center justify-between p-3">
        <div
          className="flex items-center gap-4"
          onClick={() => setShowCategories(!showCategories)}
        >
          <HiMenuAlt2 className="w-5 h-5 cursor-pointer" />
          <span className="sub-heading cursor-pointer">Shop by Category</span>
        </div>

        {showCategories && (
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-16 z-50 w-auto h-auto p-4 pb-6 bg-[#262626] text-[#6D6D6D]"
          >
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Accessories
            </li>
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Furniture
            </li>
          </motion.ul>
        )}

        <div className="bg-white w-2/5 py-1 px-4 rounded-lg flex items-center justify-between">
          <input
            type="text"
            placeholder="Search your products here"
            className="w-[90%] h-full p-1 outline-none focus:outline-none font-Poppins text-base font-normal"
          />
          <FaSearch className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-8 relative">
          {/* <Link to={`cart/${user._id}`}> */}
          <AiOutlineShoppingCart className="w-5 h-5 cursor-pointer" />
          {/* </Link> */}
          <FiUser
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          />
        </div>

        {showUserMenu && (
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-16 z-50 right-24 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
          >
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Profile
            </li>
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Orders
            </li>
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default HeaderBottom;
//
