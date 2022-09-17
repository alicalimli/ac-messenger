import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
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
    createAccount: (_state, action) => {
      createUserWithEmailAndPassword(
        auth,
        action.payload.email,
        action.payload.password
      );

      // NEEDS TO USER TUNK FOR THIS TO WORK

      if (!auth.currentUser) return;

      updateProfile(auth.currentUser, {
        displayName: action.payload.displayName,
        photoURL: action.payload.profileURL,
      });
    },
  },
});

export const { login, logout, loginWithGoogle, createAccount } =
  userSlice.actions;

export default userSlice.reducer;
