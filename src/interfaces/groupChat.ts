import { Timestamp } from "firebase/firestore";

export default interface groupChat {
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

export default interface groupChatMock {
  groupID: string;
  isGroup: boolean;
  isGlobal?: boolean;
}
