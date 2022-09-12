import { User } from "interfaces";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

export const UsersData: User[] = [
  {
    user_id: 1,
    username: "admin_chately",
    email: "admin@chately.io",
    profile: DEFAULT_PROFILE_IMAGE,
    password: "test1234",
    status: true,
    bio: "A developer",
    location: "Earth",
    contacts: [2],
    inbox: ["1-2"],
  },
  {
    user_id: 2,
    username: "alicalimli",
    email: "alicalimli@gmail.com",
    profile: DEFAULT_PROFILE_IMAGE,
    password: "test1234",
    status: true,
    bio: "A front-end developer",
    location: "Turkey",
    contacts: [1],
    inbox: ["1-2"],
  },
  {
    user_id: 3,
    username: "chately",
    email: "chately@gmail.com",
    profile: DEFAULT_PROFILE_IMAGE,
    password: "test1234",
    status: true,
    bio: "Artist",
    location: "Earth",
    contacts: [],
    inbox: [],
  },
];
