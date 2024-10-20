export enum Users {
  EventManager = 'event-manager',
};

export type User = {
  username: string;
  password: string;
  name: string;
};

const users: Record<Users, User> = {
  [Users.EventManager]: {
    username: 'user',
    password: 'password',
    name: 'Event Manager',
  }
};

export const getUser = (user: Users): User => {
  return users[user];
}
