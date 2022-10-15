import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  content: string;
};

const initialState: InitialStateType = { content: "chats" };

const sideContentSlice = createSlice({
  name: "sideContent",
  initialState,
  reducers: {
    changeSideContent: (state, action) => {
      state.content = action.payload.content;
    },
  },
});

export const getSideContent = (state: any) => state.sideContent;

export const { changeSideContent } = sideContentSlice.actions;

export default sideContentSlice.reducer;
