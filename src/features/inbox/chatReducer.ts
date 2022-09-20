import { createSlice } from "@reduxjs/toolkit";
import { User } from "interfaces";
import { auth } from "services/firebase";

// type InitialStateType = {
//   user: User | {};
// };

const initialState = {
  chatId: "",
  user: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser: (state, action) => {
      if (!auth.currentUser || !action.payload) return;

      const currentUser: any = auth.currentUser.uid;
      const recipient = action.payload.uid;

      state.user = action.payload;
      state.chatId =
        currentUser.uid > recipient.uid
          ? currentUser.uid + recipient.uid
          : recipient.uid + currentUser.uid;
    },
  },
});

export const getChatState = (state: any) => state.chat;

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;
