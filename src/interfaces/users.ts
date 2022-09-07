export interface User {
  id: number;
  username: string;
  profile: string;
  active: boolean;
}

export interface Users extends User {
  users: User[];
}
