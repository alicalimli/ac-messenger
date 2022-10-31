import { Timestamp } from "firebase/firestore";
import { UserGroupChat } from "./groupChat";

export default interface UserChat {
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

export type UserChatArray = [string, UserChat | UserGroupChat];
