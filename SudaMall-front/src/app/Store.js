import { configureStore } from '@reduxjs/toolkit';
import AppStatsReducer from './AppStats';
import userSlice from './UserInfo';

export const store = configureStore({
  reducer: {
    appStats: AppStatsReducer,
    user: userSlice,
  },
});
