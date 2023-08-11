import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreatedOrder } from '../features/order/orderSlice';
import { getUserProfile } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
import CartProducts from '../components/CartProducts';
import Container from '../components/Container';
import OrderProducts from '../components/OrderProducts';

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
    <Container>
      <div className="flex items-center w-full justify-center mb-6">
        <span className="font-Poppins font-semibold text-xl md:text-2xl mb-6">
          Your order has been placed !
        </span>
      </div>
      {!loading && currentOrder && (
        <div className="flex flex-col w-full">
          <div className="hidden w-full md:grid grid-cols-6 bg-lightColor p-6">
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
              Total
            </span>
            <span className="font-Poppins text-lg font-semibold text-center">
              Payment Status
            </span>
          </div>
          <div className="md:mt-5">
            {currentOrder.orderItems.map((item) => (
              <OrderProducts
                key={item.product._id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default PaymentSuccess;
