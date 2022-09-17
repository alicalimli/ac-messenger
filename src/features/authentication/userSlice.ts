import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
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

export const login = createAsyncThunk("user/login", async (loginInfo: any) => {
  try {
    signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password);
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
});

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
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(createAccount.pending, login.pending),
      (state) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      isAnyOf(createAccount.fulfilled, login.fulfilled),
      (state) => {
        state.status = "succeeded";
      }
    );
    builder.addMatcher(
      isAnyOf(createAccount.rejected, login.rejected),
      (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }
    );
  },
});

export const getUserState = (state: any) => state.user;

export const { logout, loginWithGoogle } = userSlice.actions;

export default userSlice.reducer;
