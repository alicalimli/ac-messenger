import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice(() => {
  name: "user";
  initialState: {
    value: {
      user_id: 0;
      username: "";
      email: "";
      profile: "";
      password: "";
      status: false;
      bio: "";
      location: "";
      contacts: [];
      inbox: [];
    }
  }
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    };
  }
});

export default userSlice.reducer;
