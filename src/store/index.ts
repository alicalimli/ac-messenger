import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "features/authentication";
import { themeReducer } from "features/sidebar";
import toastReducer from "toast";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    toast: toastReducer,
  },
});
