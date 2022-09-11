import { createSlice } from "@reduxjs/toolkit";

const toastInitialState = { message: "" };

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    value: {
      toastInitialState,
    },
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
