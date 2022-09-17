import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { User } from "interfaces";
import { auth, googleAuthProvider } from "services/firebase";

const initialState = {
  user: {},
  status: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: <any>"",
};

export const createAccount = createAsyncThunk(
  "user/createAccount",
  async (signUpInfo: any) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      );

      if (!auth.currentUser) return;

      updateProfile(auth.currentUser, {
        displayName: signUpInfo.displayName,
        photoURL: signUpInfo.photoURL,
      });
    } catch (error: any) {
      return error.message;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: any) => {
      signInWithEmailAndPassword(
        auth,
        action.payload.email,
        action.payload.password
      );
    },
    logout: (state) => {
      state.user = initialState;
    },
    loginWithGoogle: () => {
      signInWithPopup(auth, googleAuthProvider);
    },
  },
  extraReducers(builder) {
    builder.addCase(createAccount.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getUserState = (state: any) => state.user;

export const { login, logout, loginWithGoogle } = userSlice.actions;

export default userSlice.reducer;
