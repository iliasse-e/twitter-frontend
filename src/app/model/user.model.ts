export type User = {
  id: number;
  username: string;
  local: {
    email: string;
    password: string;
  }
  avatar: string;
  following: string[];
};
