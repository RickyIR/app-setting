import { User } from './user';

export interface Discussion {
  _id: string;
  discussions_group: string;
  title: string;
  permalink: string;
  user: User;
  date: {
    created: Date;
    last_answer: Date;
  }
}
