import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { User } from "interfaces";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "services/firebase";

type InitialStateType = {
  user: User | {};
  status: string;
  errorMsg: string;
};

type loginInfoType = {
  email: string;
  password: string;
};

type signUpInfoType = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
};

const initialState: InitialStateType = {
  user: {},
  status: "idle", // 'pending' | 'failed' | 'successful'
  errorMsg: "",
};

export const login = createAsyncThunk(
  "user/login",
  async (loginInfo: loginInfoType) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
    } catch (error) {
      throw error;
    }
  }
);

export const googleLogin = createAsyncThunk("user/googleLogin", async () => {
  try {
    await signInWithPopup(auth, googleAuthProvider);
  } catch (error) {
    throw error;
  }
});

export const signUp = createAsyncThunk(
  "user/googleLogin",
  async (signUpInfo: signUpInfoType) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      );

      if (!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        displayName: signUpInfo.displayName,
        photoURL: signUpInfo.photoURL,
      });
      console.log(auth.currentUser);
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState;
      signOut(auth);
    },
    clearUserStateErr: (state) => {
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.fulfilled, googleLogin.fulfilled, signUp.fulfilled),
      (state) => {
        state.status = "successful";
      }
    );
    builder.addMatcher(
      isAnyOf(login.pending, googleLogin.pending, signUp.pending),
      (state) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      isAnyOf(login.rejected, googleLogin.rejected, signUp.rejected),
      (state, action) => {
        state.status = "failed";
        state.errorMsg = action.error.message || "";
      }
    );
  },
});

export const getUserState = (state: any) => state.user;

export const { logout, clearUserStateErr } = userSlice.actions;

export default userSlice.reducer;
