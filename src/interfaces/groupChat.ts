import { Timestamp } from "firebase/firestore";

export default interface GroupChat {
  isGroup: true;
  ownerUID: string;
  photoURL: string;
  groupName: string;
  groupAdmins: [];
  membersID: [];
  groupID: string;
  dateCreated: Timestamp;
  lastMessage: {
    date: Timestamp;
    message: string;
  };
}

export interface GroupChatMock {
  groupID: string;
  isGroup: true;
  active: boolean;
  unread: boolean;
  unreadMsgCount: number;
  lastMessage: {
    message: string;
    date: Timestamp;
  };
  isGlobal?: boolean;
}
