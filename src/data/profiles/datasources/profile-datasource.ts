import type { ProfileEntity } from '../models/profile-entity';

export interface ProfileDataSource {
  getProfiles(): Promise<ProfileEntity[]>;
  getProfile(id: number): Promise<ProfileEntity | undefined>;
  addProfile(profile: ProfileEntity): Promise<number>;
  updateProfile(id: number, profile: Partial<ProfileEntity>): Promise<void>;
  deleteProfile(id: number): Promise<void>;
}
