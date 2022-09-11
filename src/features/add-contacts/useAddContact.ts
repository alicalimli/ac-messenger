import Chat from "interfaces/chats";
import User from "interfaces/users";
import { ChatsData, UsersData } from "localdatas";
import { createToast } from "toast";

const useAddContact = () => {
  const addContact = (currentUser: User, recipient: User) => {
    try {
      const currentUserData = UsersData.find(
        (user) => user.user_id === currentUser?.user_id
      );
      const recipientData = UsersData.find(
        (user) => user.user_id === recipient?.user_id
      );
      const chatRoomId = `${currentUser?.user_id}-${recipient?.user_id}`;
      const ChatRoomData: Chat = {
        chat_room_id: chatRoomId,
        messages: [{ message: "blah", time: "test" }],
        last_message: "test",
        active_chat: false,
      };

      // Delay a bit to show loading msg
      setTimeout(() => {
        if (!currentUserData || !recipientData) return;
        currentUserData.inbox.push(chatRoomId);
        recipientData.inbox.push(chatRoomId);
        currentUserData.contacts.push(recipientData.user_id);
        recipientData.contacts.push(currentUserData.user_id);
        ChatsData.push(ChatRoomData);
        dispatch(createToast("Contact added successfuly."));
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  return addContact;
};

export default useAddContact;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
