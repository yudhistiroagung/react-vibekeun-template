import type { Profile } from './models';

export interface ProfileRepository {
  getProfiles: () => Promise<Profile[]>;
  getDefaultProfile: () => Promise<Profile | undefined>;
  createProfile: (profile: Omit<Profile, 'id'>) => Promise<number>;
  updateProfile: (id: number, profile: Partial<Profile>) => Promise<number>;
}
