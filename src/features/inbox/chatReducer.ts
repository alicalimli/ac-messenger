import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "interfaces";
import { auth } from "setup/firebase";

// type InitialStateType = {
//   user: User | {};
// };

const initialState = {
  chatId: "",
  recipient: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChat: (state, action: PayloadAction<User>) => {
      if (!auth.currentUser || !action.payload) return;

      const currentUser: any = auth.currentUser;
      const recipient = action.payload;

      state.recipient = action.payload;
      state.chatId =
        currentUser.uid > recipient.uid
          ? currentUser.uid + recipient.uid
          : recipient.uid + currentUser.uid;

      console.log(state.chatId);
    },
    resetChat: (state) => {
      state.chatId = "";
      state.recipient = {};
    },
  },
});

export const getChatState = (state: any) => state.chat;

export const { changeChat, resetChat } = chatSlice.actions;

export default chatSlice.reducer;
