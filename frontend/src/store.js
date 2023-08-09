import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import userSlice from './features/user/userSlice';
import productSlice from './features/product/productSlice';
import orderSlice from './features/order/orderSlice';
import cartSlice from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    order: orderSlice,
    cart: cartSlice,
  },
});

export default store;
