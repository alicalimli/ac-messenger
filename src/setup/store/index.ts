import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "features/authentication";
import chatReducer from "features/inbox/chatReducer";
import { themeReducer } from "features/sidebar";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import toastReducer from "toastSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user", "chat", "toast"],
};

const reducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  chat: chatReducer,
  toast: toastReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

console.log(persistedReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
