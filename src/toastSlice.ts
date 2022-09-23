import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  message: string;
};

const initialState = { message: "", pendingMsg: "" };

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    createToast: (state, actions) => {
      state.message = actions.payload;
    },
    removeToast: (state) => {
      state.message = "";
    },
    makePendingMsg: (state, action: PayloadAction<string>) => {
      state.pendingMsg = action.payload;
    },
  },
});

export const getToastMsg = (state: any) => state.toast.message;

export const getPendingMsg = (state: any) => state.toast.pendingMsg;

export const { createToast, removeToast, makePendingMsg } = toastSlice.actions;

export default toastSlice.reducer;
