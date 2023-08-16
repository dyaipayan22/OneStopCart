import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Button from '../components/ui/Button';
import {
  clearCart,
  getCartItems,
  removeItemFromCart,
} from '../features/cart/cartSlice';
import { getUserProfile } from '../features/user/userSlice';

import { BiShoppingBag } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import { createOrder } from '../features/order/orderSlice';
import CartProducts from '../components/CartProducts';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const Cart = () => {
  const dispatch = useDispatch();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const user = useSelector((state) => state.user.userInfo);

  const { cartItems, loading } = useSelector((state) => state.cart);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('/api/pay/create-checkout-session', {
        cartItems,
        user,
      });
      if (data.url) {
        window.location.href = data.url;
        setOrderPlaced(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getCartItems());
    if (orderPlaced) {
      dispatch(
        createOrder({ orderItems: cartItems, itemsPrice: 100, totalPrice: 100 })
      );
    }
  }, [dispatch, orderPlaced]);

  return (
    <Container>
      {loading && <p>Loading</p>}

      {cartItems?.length === 0 || cartItems === null ? (
        <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center">
          <span className="text-2xl lg:text-3xl font-Poppins font-medium">
            Oops! No items in your cart.
          </span>
          <Link to="/">
            <div className="flex items-center gap-4 bg-primeColor text-white p-3 rounded-sm">
              <span className="text-xl lg:text-2xl font-Poppins font-normal">
                Start Shopping
              </span>

              <BiShoppingBag className="w-8 h-8 cursor-pointer" />
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <span className="text-xl lg:text-4xl font-Poppins font-semibold mb-6">
            Cart
          </span>
          <div className="hidden w-full md:grid grid-cols-5 bg-lightColor p-6">
            <span className="col-span-2 font-Poppins text-lg font-semibold text-center">
              Product
            </span>
            <span className="font-Poppins text-lg font-semibold text-center">
              Price
            </span>
            <span className="font-Poppins text-lg font-semibold text-center">
              Quantity
            </span>
            <span className="font-Poppins text-lg font-semibold text-center">
              Sub Total
            </span>
          </div>
          <div className="mt-5">
            {cartItems?.map((item) => (
              <CartProducts
                key={item.product._id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>

          <div className="flex flex-col w-full md:w-96 mt-10 gap-4 ">
            <span className="font-Poppins font-semibold text-xl">
              Cart Total
            </span>
            <div>
              <p className="font-Poppins flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-base md:text-lg px-4 font-medium">
                Subtotal
                <span className="font-Poppins font-semibold tracking-wide font-titleFont">
                  {cartItems?.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )}
                </span>
              </p>
              <p className="font-Poppins flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-base md:text-lg px-4 font-medium">
                Shipping Charges
                <span className="font-Poppins font-semibold tracking-wide font-titleFont">
                  0
                </span>
              </p>
              <p className="font-Poppins flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-base md:text-lg px-4 font-medium">
                Total
                <span className="font-Poppins font-bold tracking-wide text-base md:text-lg font-titleFont">
                  {cartItems?.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )}
                </span>
              </p>
              <Button label="Proceed to Checkout" onClick={handleCheckout} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
