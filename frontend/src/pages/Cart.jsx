import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Button from '../components/ui/Button';
import { getCartItems, removeItemFromCart } from '../features/cart/cartSlice';
import { getUserProfile } from '../features/user/userSlice';

import { AiTwotoneDelete } from 'react-icons/ai';
import { createOrder } from '../features/order/orderSlice';
import CartProducts from '../components/CartProducts';

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

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col p-6 col-span-2 ">
          <p className="text-xl lg:text-2xl font-Poppins font-semibold ">
            Cart Items
          </p>
          {cartItems?.length === 0 || cartItems === null ? (
            <p>No items in cart</p>
          ) : (
            cartItems?.map((item) => (
              <CartProducts
                key={item.product._id}
                product={item.product}
                quantity={item.quantity}
                handleRemoveItem={() => {
                  dispatch(removeItemFromCart(item.product._id));
                }}
              />
            ))
          )}
        </div>

        {cartItems?.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-col p-6 lg:h-auto">
              <span className="text-xl lg:text-2xl font-Poppins font-semibold">
                Subtotal{' '}
                {cartItems?.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
              {/* <span className="text-xl lg:text-2xl font-Poppins font-semibold md:hidden">
                &nbsp;:
              </span> */}
              <span className="text-xl font-Poppins font-semibold pb-4">
                &#8377;{' '}
                {cartItems
                  ?.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )
                  .toFixed(2)}
              </span>
              {/* <p className="text-xl lg:text-2xl font-Poppins font-semibold">
              Subtotal{' '}
              {cartItems?.reduce((acc, item) => acc + item.quantity, 0)} Items
            </p>
            <p className="text-xl font-Poppins font-semibold pb-4">
              Rs.
              {cartItems
                ?.reduce(
                  (acc, item) => acc + item.quantity * item.product.price,
                  0
                )
                .toFixed(2)}
            </p>
            <Button label="Proceed to Checkout" onClick={handleCheckout} /> */}
            </div>
            <Button label="Proceed to Checkout" onClick={handleCheckout} />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
