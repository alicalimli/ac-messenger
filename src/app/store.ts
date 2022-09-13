import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "features/authentication";
import { themeReducer } from "features/sidebar";
import toastReducer from "toastSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
