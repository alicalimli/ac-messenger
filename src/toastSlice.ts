import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  message: string;
};

const initialState = { message: "" };

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    value: initialState,
  },
  reducers: {
    createToast: (state, actions) => {
      state.value.message = actions.payload;
    },
    removeToast: (state) => {
      state.value.message = "";
    },
  },
});

export const { createToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
