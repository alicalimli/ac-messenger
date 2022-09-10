import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "/src/features/authentication";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
