import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openMenu: false,
  openMap: false,
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

    // open and close google map
    openMap: (state) => {
      state.openMap = true;
    },
    closeMap: (state) => {
      state.openMap = false;
    }

  },
});

export const SelectOpenMenu = (state) => state.appStats.openMenu;
export const SelectMap = (state) => state.appStats.openMap;

export const { openMenu, closeMenu, toggleMenu, openMap, closeMap } = AppStatsSlice.actions;

export default AppStatsSlice.reducer;
