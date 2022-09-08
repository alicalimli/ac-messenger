export default interface User {
  user_id: number;
  username: string;
  email: string;
  profile: string;
  password?: string;
  status: boolean;
  bio: string;
  location: string;
  contacts: number[];
  inbox: string[];
}
