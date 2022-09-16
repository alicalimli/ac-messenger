import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { User } from "interfaces";
import { auth, googleAuthProvider } from "services/firebase";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState;
    },
    loginWithGoogle: () => {
      signInWithPopup(auth, googleAuthProvider);
    },
  },
});

export const { login, logout, loginWithGoogle } = userSlice.actions;

export default userSlice.reducer;
