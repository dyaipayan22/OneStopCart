import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreatedOrder } from '../features/order/orderSlice';
import { getUserProfile } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
import CartProducts from '../components/CartProducts';

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { currentOrder, loading } = useSelector((state) => state.order);
  console.log(currentOrder);

  useEffect(() => {
    dispatch(clearCart());
    if (!userInfo) {
      dispatch(getUserProfile()).then(() => {
        dispatch(getCreatedOrder());
      });
    } else {
      dispatch(getCreatedOrder());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="flex flex-col">
      <span className="font-Poppins font-semibold text-xl md:text-2xl text-center">
        Payment successful! Your order has been placed.
      </span>
      {!loading && currentOrder && (
        <div className="flex flex-col">
          <span className="text-xl lg:text-2xl font-Poppins font-semibold">
            Order Summary
          </span>
          <div className="flex flex-col gap-2 w-[2/4]">
            <span>Order ID: {currentOrder._id}</span>
            {currentOrder.orderItems?.map((item) => (
              <CartProducts
                key={item.product._id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
