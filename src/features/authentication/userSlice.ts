import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { User } from "interfaces";
import { auth } from "services/firebase";

type InitialStateType = {
  user: User | {};
};

const initialState: InitialStateType = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state:any) => {
      state.user = initialState;
      signOut(auth);
    },
  },
});

export const getUserState = (state: any) => state.user;

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
