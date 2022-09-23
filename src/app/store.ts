import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from "features/authentication";
import chatReducer from "features/inbox/chatReducer";
import { themeReducer } from "features/sidebar";
import toastReducer from "toastSlice";

const store = configureStore({

reducer: {
    user: userReducer,
    theme: themeReducer,
    toast: toastReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
