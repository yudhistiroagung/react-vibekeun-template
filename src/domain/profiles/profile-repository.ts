import type { Profile } from './models/profile';

export interface ProfileRepository {
  getAll(): Promise<Profile[]>;
  getById(id: number): Promise<Profile | undefined>;
  create(profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile>;
  update(id: number, profile: Partial<Profile>): Promise<Profile>;
  delete(id: number): Promise<void>;
}
