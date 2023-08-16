import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { HiMenuAlt2 } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getUserProfile } from '../../features/user/userSlice';

const HeaderBottom = () => {
  const dispatch = useDispatch();

  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className="w-full bg-[#F5F5F3] top-14 lg:top-16 relative">
      <div className="container mx-auto px-4 flex flex-row items-center justify-between h-14 md:h-16">
        <div
          className="flex items-center gap-4"
          onClick={() => setShowCategories(!showCategories)}
        >
          <HiMenuAlt2 className="w-5 h-5 cursor-pointer" />
          <span className="hidden md:block sub-heading cursor-pointer">
            Shop by Category
          </span>
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

        <div className="bg-white h-2/3 md:h-3/4 w-2/5 py-0 md:py-1 px-2 md:px-4 rounded-lg flex items-center justify-between">
          <input
            type="text"
            placeholder="Search"
            className="w-[90%] h-full p-0 md:p-1 outline-none focus:outline-none font-Poppins text-sm md:text-base font-normal"
          />
          <FaSearch className="w-4 h-4" />
        </div>

        <div className="flex items-center gap-8">
          {userInfo && (
            <Link to={`/cart/${userInfo._id}`}>
              <div className="relative">
                <AiOutlineShoppingCart className="w-5 h-5 cursor-pointer" />
                {userInfo.cart.length > 0 && (
                  <span className="absolute top-3 -right-2 font-Poppins text-bold text-base">
                    {userInfo.cart?.length}
                  </span>
                )}
              </div>
            </Link>
          )}

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
            {userInfo !== null ? (
              <>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Profile
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Orders
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Logout
                </li>
              </>
            ) : (
              <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                Sign In
              </li>
            )}
          </motion.ul>
        )}
      </div>
    </div>
  );
};

export default HeaderBottom;
