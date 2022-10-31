import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { User, UserGroupChat } from "interfaces";
import { signInWithPopup } from "firebase/auth";
import { auth, db, googleAuthProvider } from "setup/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

type InitialStateType = {
  user: User | {};
  status: string;
  errorMsg: string;
};

type loginInfoType = {
  email: string;
  password: string;
};

type signUpInfoType = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
};

type editInfoType = {
  displayName?: string;
  bio?: string;
  location?: string;
  photoURL?: string;
};

const initialState: InitialStateType = {
  user: {},
  status: "idle", // 'pending' | 'failed' | 'successful'
  errorMsg: "",
};

const setUserInfoDoc = async () => {
  if (!auth.currentUser) return;

  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userDocData = await getDoc(userDocRef);
  const userChatsDocRef = doc(db, "userChats", auth.currentUser.uid);
  const userChatsDocData = await getDoc(userChatsDocRef);

  const globalChatID = "HSEgujrHH66JVwXmg7QG";
  const globalChatRef = doc(db, "groupChats", globalChatID);

  const userInfo: User = {
    isUser: true,
    isGroup: false,
    uid: auth.currentUser.uid,
    photoURL: auth.currentUser.photoURL as string,
    displayName: auth.currentUser.displayName as string,
    email: auth.currentUser.email as string,
    bio: "A Bio.",
    status: "off",
    location: "Earth",
    contacts: [],
  };

  if (!userDocData.exists()) {
    setDoc(userDocRef, userInfo);
  }

  if (!userChatsDocData.exists()) {
    await setDoc(userChatsDocRef, {});

    const userChatsData = userChatsDocData.data();
    const globalChatData = userChatsData?.[globalChatID];

    if (globalChatData) return;

    const userGroupChatInfo: UserGroupChat = {
      groupID: globalChatID,
      isGroup: true,
      active: false,
      unread: false,
      unreadMsgCount: 0,
      lastMessage: {
        message: "Group Chat Created.",
        date: Timestamp.now(),
      },
    };

    // Adds user in global chat test group
    updateDoc(userChatsDocRef, {
      [globalChatID]: userGroupChatInfo,
    });

    updateDoc(globalChatRef, {
      membersID: arrayUnion(auth.currentUser.uid),
    });
  }
};

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (editInfo: editInfoType) => {
    try {
      if (!auth.currentUser) return;

      const userDocRef = doc(db, "users", auth.currentUser.uid);

      if (editInfo.photoURL) {
        await updateProfile(auth.currentUser, {
          photoURL: editInfo.photoURL,
        });
        await updateDoc(userDocRef, {
          photoURL: editInfo.photoURL,
        });
        return;
      }

      await updateProfile(auth.currentUser, {
        displayName: editInfo.displayName,
      });
      await updateDoc(userDocRef, {
        displayName: editInfo.displayName,
        bio: editInfo.bio,
        location: editInfo.location,
      });
    } catch (error) {
      throw error;
    }
  }
);

export const emailLogin = createAsyncThunk(
  "user/emailLogin",
  async (loginInfo: loginInfoType) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );

      setUserInfoDoc();
    } catch (error) {
      throw error;
    }
  }
);

export const googleLogin = createAsyncThunk("user/googleLogin", async () => {
  try {
    await signInWithPopup(auth, googleAuthProvider);
    setUserInfoDoc();
  } catch (error) {
    throw error;
  }
});

export const signUp = createAsyncThunk(
  "user/googleLogin",
  async (signUpInfo: signUpInfoType) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      );

      if (!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        displayName: signUpInfo.displayName,
        photoURL: signUpInfo.photoURL,
      });
      setUserInfoDoc();
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (state) => {
  try {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        status: "offline",
      });
    }
  } catch (error) {
    throw error;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(userDocRef, {
          status: "offline",
        });
      }

      state.user = initialState;
      signOut(auth);
    },
    clearUserStateErr: (state) => {
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = initialState;
      signOut(auth);
    });
    builder.addMatcher(
      isAnyOf(
        emailLogin.fulfilled,
        googleLogin.fulfilled,
        signUp.fulfilled,
        editProfile.fulfilled
      ),
      (state) => {
        state.status = "successful";
      }
    );
    builder.addMatcher(
      isAnyOf(
        emailLogin.pending,
        googleLogin.pending,
        signUp.pending,
        editProfile.pending
      ),
      (state) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      isAnyOf(
        emailLogin.rejected,
        googleLogin.rejected,
        signUp.rejected,
        editProfile.rejected
      ),
      (state, action) => {
        state.status = "failed";
        state.errorMsg = action.error.message || "";
      }
    );
  },
});

export const getUserState = (state: any) => state.user;

export const { login, clearUserStateErr } = userSlice.actions;

export default userSlice.reducer;
