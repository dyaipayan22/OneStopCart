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
    <>
      {loading && <p>Loading</p>}

      {cartItems?.length === 0 || cartItems === null ? (
        <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center">
          <span className="text-2xl lg:text-3xl font-Poppins font-medium">
            Oops! No items in your cart.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xl lg:text-2xl font-Poppins font-normal">
              Start Shopping
            </span>
            <Link to="/">
              <BiShoppingBag className="w-8 h-8 cursor-pointer" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col p-6 col-span-2 ">
            <span className="text-xl lg:text-2xl font-Poppins font-semibold ">
              Cart Items
            </span>
            {cartItems?.map((item) => (
              <CartProducts
                key={item.product._id}
                product={item.product}
                quantity={item.quantity}
                handleRemoveItem={() => {
                  dispatch(removeItemFromCart(item.product._id));
                }}
              />
            ))}
            <Button
              label="Clear Cart"
              onClick={() => {
                dispatch(clearCart());
              }}
            />
          </div>

          <div className="flex flex-col p-6">
            <div className="flex flex-col lg:h-auto gap-4 pb-4">
              <span className="text-xl lg:text-2xl font-Poppins font-semibold">
                Subtotal{' '}
                {cartItems?.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
              <span className="font-Poppins text-base lg:text-lg font-medium">
                Items Price: &#8377;{' '}
                {cartItems
                  ?.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <Button label="Proceed to Checkout" onClick={handleCheckout} />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
