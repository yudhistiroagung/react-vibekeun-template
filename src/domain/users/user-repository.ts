import type { User } from './models/user';
export interface UserRepository {
  createUser(user: Omit<User, 'id'>): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
}
