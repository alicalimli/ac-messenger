import { Timestamp } from "firebase/firestore";
import { GroupChatMock } from "./groupChat";

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
  isGroup: false;
}

export type userChatArray = [string, userChat | GroupChatMock];
