import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "interfaces";

const userInitialState: User = {
  user_id: 0,
  username: "",
  email: "",
  profile: "",
  password: "",
  status: false,
  bio: "",
  location: "",
  contacts: [],
  inbox: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: userInitialState,
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = userInitialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
