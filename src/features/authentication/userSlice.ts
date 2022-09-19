import { createSlice } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "services/firebase";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState;
    },
    loginWithGoogle: () => {
      signInWithPopup(auth, googleAuthProvider);
    },
  },
});

export const getUserState = (state: any) => state.user;

export const { logout, loginWithGoogle } = userSlice.actions;

export default userSlice.reducer;
