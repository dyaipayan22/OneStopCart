import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../features/cart/cartSlice';
import { ImCross } from 'react-icons/im';

const CartProducts = ({ product, quantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full grid grid-cols-5 border py-2">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <ImCross
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
          onClick={() => {
            dispatch(removeItemFromCart(product._id));
          }}
        />
        <img
          src={`${product.image}`}
          alt={product.name}
          className="w-32 h-32"
        />
        <span className="font-Poppins text-base md:text-lg font-medium">
          {product.name}
        </span>
      </div>
      <div className="col-span-5 md:col-span-3 flex items-center justify-between p-4 md:p-0 gap-6 md:gap-0">
        <div className="flex w-1/3 items-center gap-6 ">
          <span className="font-Poppins text-base md:text-lg font-medium md:mx-auto">
            &#8377; {product.price}
          </span>
        </div>
        <div className="flex w-1/3 items-center gap-6 ">
          <div className="flex gap-3 mx-auto">
            <span className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300">
              -
            </span>
            <p className="font-Poppins text-base md:text-lg font-medium">
              {quantity}
            </p>
            <span className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300">
              +{' '}
            </span>
          </div>
        </div>
        <div className="flex w-1/3 items-center gap-6">
          <span className="font-Poppins text-base md:text-lg font-semibold md:mx-auto">
            &#8377; {product.price * quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
