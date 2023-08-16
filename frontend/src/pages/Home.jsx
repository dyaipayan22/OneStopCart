import { FaTruck } from 'react-icons/fa';
import { BsArrowClockwise } from 'react-icons/bs';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <>
      <div className="w-screen">
        <Banner />
      </div>

      <div className="container mx-auto flex flex-col w-full md:gap-8">
        <span className="hidden md:block text-center font-Poppins text-2xl font-semibold py-4">
          Why choose us?
        </span>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between container mx-auto  py-8 px-4 md:border-y-2">
          <span className="text-center md:hidden font-Poppins text-xl font-semibold">
            Why choose us?
          </span>
          <div className="flex gap-4 items-center">
            <span className="font-Poppins text-lg md:text-xl font-bold">2</span>
            <span className="font-Poppins text-lg md:text-xl font-semibold ">
              Two years warranty
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <FaTruck className="w-5 h-5 md:w-7 md:h-7" />
            <span className="font-Poppins text-lg md:text-xl font-semibold ">
              Free shipping
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <BsArrowClockwise className="w-5 h-5 md:w-7 md:h-7" />
            <span className="font-Poppins text-lg md:text-xl font-semibold ">
              30 day easy return policy
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <span className="font-Poppins text-2xl font-semibold">
            Top Rated Products
          </span>
        </div>
      </div>
    </>
  );
};

export default Home;
