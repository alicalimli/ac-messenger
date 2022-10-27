import { Timestamp } from "firebase/firestore";
import { groupChatMockArray } from "./groupChat";

export default interface userChat {
  active: boolean;
  lastMessage: {
    date: Timestamp;
    message: string;
  };
  unread: boolean;
  unreadMsgCount: number;
  userInfo: {
    uid: string;
  };
}

export type userChatArray = [string, userChat] & groupChatMockArray;
