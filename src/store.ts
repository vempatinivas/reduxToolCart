import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;