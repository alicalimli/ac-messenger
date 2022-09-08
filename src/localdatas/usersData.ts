const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

type User = {
  user_id: number;
  username: string;
  email: string;
  profile: string;
  password: string;
  status: boolean;
  bio: string;
  location: string;
};

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
  },
  {
    user_id: 1,
    username: "alicalimli",
    email: "alicalimli@gmail.com",
    profile: DEFAULT_PROFILE_IMAGE,
    password: "test1234",
    status: true,
    bio: "A front-end developer",
    location: "Turkey",
  },
  {
    user_id: 1,
    username: "chately",
    email: "chately@gmail.com",
    profile: DEFAULT_PROFILE_IMAGE,
    password: "test1234",
    status: true,
    bio: "Artist",
    location: "Earth",
  },
];
