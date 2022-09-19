import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "services/firebase";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState;
      signOut(auth);
    },
  },
});

export const getUserState = (state: any) => state.user;

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
