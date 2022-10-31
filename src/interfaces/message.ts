import { Timestamp } from "firebase/firestore";

export default interface Message {
  id: string;
  senderId: string;
  message: string;
  date: Timestamp;
  img: string;
  lastEdited: Timestamp | null;
  isEdited: boolean;
}
