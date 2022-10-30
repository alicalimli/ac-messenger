import { useAppDispatch, useAppSelector } from "hooks";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "setup/firebase";

import { v4 as uuid } from "uuid";
import { createToast } from "toastSlice";
import { useState } from "react";
import { changeSideContent } from "reducers/sideContentReducer";

type groupInfoParams = {
  ownerUID: string;
  membersID: string[];
  photoURL: string;
  groupName: string;
};

const useCreateGroup = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useAppDispatch();

  const createGroup = async ({
    ownerUID,
    membersID,
    photoURL,
    groupName,
  }: groupInfoParams) => {
    try {
      setErrorMsg("");
      setIsPending(true);

      const groupChatID = uuid();

      const groupChatRef = doc(db, "groupChats", groupChatID);
      const groupConversationRef = doc(db, "chats", groupChatID);
      const currentUserChatDocRef = doc(db, "userChats", ownerUID);

      await setDoc(groupConversationRef, {
        messages: [],
      });

      await setDoc(groupChatRef, {
        groupID: groupChatID,
        groupName: groupName,
        ownerUID,
        groupAdmins: [ownerUID],
        photoURL: photoURL,
        membersID: [...membersID, ownerUID],
        dateCreated: Timestamp.now(),
        lastMessage: {
          message: "Group Created.",
          date: Timestamp.now(),
        },
      });

      await updateDoc(currentUserChatDocRef, {
        [groupChatID]: {
          active: false,
          unread: false,
          unreadMsgCount: 0,
          isGroup: true,
          groupID: groupChatID,
          lastMessage: {
            message: "Group Created.",
            date: Timestamp.now(),
          },
        },
      });

      membersID.forEach(async (id: string) => {
        const userChatsDocRef = doc(db, "userChats", id);
        await updateDoc(userChatsDocRef, {
          [groupChatID]: {
            isGroup: true,
            groupID: groupChatID,
          },
        });
      });

      dispatch(createToast("Group created"));
      dispatch(changeSideContent({ content: "chats" }));
      setIsPending(false);
    } catch (error: any) {
      setIsPending(false);
      setErrorMsg(error.message);
      dispatch(createToast("Something wen't wrong"));
    }
  };

  return { createGroup, isPending, errorMsg };
};

export default useCreateGroup;
