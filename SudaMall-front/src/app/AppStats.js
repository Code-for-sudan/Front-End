import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openMenu: false,
  openMap: false,
  addProduct: false,
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
    },

    // open modal for adding product
    openAddProduct: (state) => {
      state.addProduct = true;
    },
    closeAddProduct: (state) => {
      state.addProduct = false;
    },
  },
});

export const SelectOpenMenu = (state) => state.appStats.openMenu;
export const SelectMap = (state) => state.appStats.openMap;
export const SelectAddProduct = (state) => state.appStats.addProduct;

export const { openMenu, closeMenu, toggleMenu, openMap,
               closeMap, openAddProduct, closeAddProduct, } = AppStatsSlice.actions;

export default AppStatsSlice.reducer;
