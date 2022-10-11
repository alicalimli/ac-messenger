import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "interfaces";
import { auth } from "setup/firebase";

// type InitialStateType = {
//   user: User | {};
// };

const initialState = {
  chatId: "",
  recipient: {},
  isGroup: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChat: (
      state,
      action: PayloadAction<{ recipient: User | any; isGroup: boolean }>
    ) => {
      if (!auth.currentUser || !action.payload) return;

      if (action.payload.isGroup) {
        state.isGroup = action.payload.isGroup;
        state.recipient = action.payload.recipient;
        state.chatId = action.payload.recipient.groupID;
        return;
      }

      const currentUser: any = auth.currentUser;
      const recipient = action.payload.recipient;

      state.isGroup = false;
      state.recipient = action.payload.recipient;
      state.chatId =
        currentUser.uid > recipient.uid
          ? currentUser.uid + recipient.uid
          : recipient.uid + currentUser.uid;
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
