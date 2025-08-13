import { configureStore } from '@reduxjs/toolkit';
import AppStatsReducer from './AppStats';

export const store = configureStore({
  reducer: {
    appStats: AppStatsReducer,
    cart: cartReducer,
  },
});
