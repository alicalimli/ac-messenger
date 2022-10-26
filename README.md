# AC Messenger

A Full Stack Chat Application using React and Firebase

## App Preview

https://user-images.githubusercontent.com/79793867/198003660-f5a2af9f-e9a6-4511-bb26-1716f9523f95.mp4


## Features

- Group Chats
- Edit/Delete Messages
- Sending Images
- Profile Editing
- Google Sign In
- Light / Dark mode toggler

## Setup Firebase Project

- Create Firebase Project
- Enable Authentication ( Email and Google Auth )
- Enable Firestore DB and Storage
- Create Collections ( users, userChats, chats, globalChats )

## Installation Process

Step 1: Clone Repository and Install Packages.

```bash
  git clone https://github.com/alicalimli/ac-messenger && cd ac-messenger && npm install
```

Step 2: Create firebaseConfig.ts file inside **src/setup/firebase** directory.

```bash
// firebaseConfig.ts
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

```

Step 3: Start the development server.

```bash
  npm start
```

## Support

You can support this project by leaving a star, Thank you 😁

## Authors

- [@alicalimli](https://www.github.com/alicalimli)
