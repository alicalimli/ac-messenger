import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Creates a global test group to play around once.
const createGlobalChat = async () => {
  const globalChatID = "HSEgujrHH66JVwXmg7QG";

  const globalChatRef = doc(db, "groupChats", globalChatID);
  const globalChatDoc = await getDoc(globalChatRef);

  if (!globalChatDoc.exists()) {
    const chatsRef = doc(db, "chats", globalChatID);

    const globalChatInfo = {
      groupID: globalChatID,
      groupName: "Global Chat",
      groupAdmins: [],
      photoURL:
        "https://media.istockphoto.com/vectors/work-from-anywhere-around-the-world-remote-working-or-freelance-or-vector-id1340230976?b=1&k=20&m=1340230976&s=612x612&w=0&h=xun7tll_qGMQd0pI0HQ4JuXUjWAk_vij24Kcm4qtBQI=",
      membersID: [],
      dateCreated: Timestamp.now(),
      lastMessage: {
        message: "Group Created.",
        date: Timestamp.now(),
      },
    };

    setDoc(globalChatRef, globalChatInfo);

    setDoc(chatsRef, {
      messages: [],
    });
  }
};

createGlobalChat();
