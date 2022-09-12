import Message from "./message";

export default interface Chat {
  chat_room_id: string;
  messages: Message[];
  last_message: string;
  active_chat: false;
}
