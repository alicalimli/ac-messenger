import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "features/authentication";
import { themeReducer } from "features/sidebar";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
