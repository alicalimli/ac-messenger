import { createSlice } from "@reduxjs/toolkit";
import { User } from "interfaces";

type InitialStateType = {
  content: string;
  userProfileData: User | null;
};

const initialState: InitialStateType = {
  content: "chats",
  userProfileData: null,
};

const sideContentSlice = createSlice({
  name: "sideContent",
  initialState,
  reducers: {
    changeSideContent: (state, action) => {
      state.content = action.payload.content;
    },
    showUserProfile: (state, action) => {
      state.content = "profile";
      state.userProfileData = action.payload.userProfileData;
    },
  },
});

export const getSideContent = (state: any) => state.sideContent;

export const { changeSideContent, showUserProfile } = sideContentSlice.actions;

export default sideContentSlice.reducer;
