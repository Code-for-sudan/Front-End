import { configureStore } from '@reduxjs/toolkit';
import AppStatsReducer from './AppStats';
import cartReducer from "./cartSlice"


export const store = configureStore({
  reducer: {
    appStats: AppStatsReducer,
    cart: cartReducer,
  },
});
