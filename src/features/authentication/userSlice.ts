import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "interfaces";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "services/firebase";

type InitialStateType = {
  user: User | {};
  status: string;
  errorMsg: string;
};

type loginParamsType = {
  email: string;
  password: string;
};

const initialState: InitialStateType = {
  user: {},
  status: "idle", // 'pending' | 'failed' | 'successful'
  errorMsg: "",
};

export const login = createAsyncThunk(
  "user/login",
  async (userCred: loginParamsType) => {
    try {
      await signInWithEmailAndPassword(auth, userCred.email, userCred.password);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState;
      signOut(auth);
    },
    clearErrorMsg: (state) => {
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.pending, googleLogin.pending),
      (state, action) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      isAnyOf(login.fulfilled, googleLogin.fulfilled),
      (state, action) => {
        state.status = "successful";
      }
    );
    builder.addMatcher(
      isAnyOf(login.rejected, googleLogin.rejected),
      (state, action) => {
        state.status = "failed";
        state.errorMsg = action.error.message || "";
      }
    );
  },
});

export const getUserState = (state: any) => state.user;

export const { logout, clearErrorMsg } = userSlice.actions;

export default userSlice.reducer;
