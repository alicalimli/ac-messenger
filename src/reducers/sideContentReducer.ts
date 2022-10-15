import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  content: string;
};

const initialState: InitialStateType = { content: "chats" };

const sideContentSlice = createSlice({
  name: "sideContent",
  initialState,
  reducers: {
    changeChat: (state, action) => {
      state.content = action.payload.content;
    },
  },
});

export const getThemeState = (state: any) => state.theme;

export const { changeChat } = sideContentSlice.actions;

export default sideContentSlice.reducer;
