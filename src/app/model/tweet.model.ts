import { User } from "./user.model";

export type Tweet = {
  id: number;
  content: string;
  author: User
};

