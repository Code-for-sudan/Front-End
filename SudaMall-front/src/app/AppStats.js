import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openMenu: false,
};

const AppStatsSlice = createSlice({
  name: 'appStats',
  initialState,
  reducers: {

    // menu actions
    openMenu: (state) => {
      state.openMenu = true;
    },
    closeMenu: (state) => {
      state.openMenu = false;
    },
    toggleMenu: (state) => {
      state.openMenu = !state.openMenu;
    },

  },
});

export const SelectOpenMenu = (state) => state.appStats.openMenu;

export const { openMenu, closeMenu, toggleMenu } = AppStatsSlice.actions;

export default AppStatsSlice.reducer;
