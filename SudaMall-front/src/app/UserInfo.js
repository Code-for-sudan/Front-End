import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Default structure based on your backend data
const defaultUser = {
  token: null, // Add token manually if needed
  id: null,
  first_name: "",
  last_name: "",
  email: "",
  account_type: "",
  gender: "",
  phone_number: null,
  whatsapp_number: null,
  profile_picture: null,
};

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : defaultUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data after login
    setUser: (state, action) => {
      state.user = {
        ...action.payload,
      };
      localStorage.setItem("user", JSON.stringify(state.user));
      toast.success(`مرحباً ${action.payload.first_name} 👋`);
    },

    // Clear user data after logout
    clearUser: (state) => {
      state.user = { ...defaultUser };
      localStorage.removeItem("user");
      toast.success("تم تسجيل الخروج بنجاح");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.user;

export default userSlice.reducer;
