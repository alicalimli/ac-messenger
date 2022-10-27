import { Timestamp } from "firebase/firestore";

export default interface GroupChat {
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
  isGroup: boolean;
  isGlobal?: boolean;
}

export type GroupChatMockArray = [string, GroupChatMock];
