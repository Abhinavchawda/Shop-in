import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/ProductList/ProductSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/AdminSlice';
import searchReducer from '../features/navbar/SearchSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    admin: adminReducer,
    search: searchReducer
  },
});
