import { inject, singleton } from 'tsyringe';

import type { ProfileEntity } from '../../models/profile-entity';
import type { ProfileDataSource } from '../profile-datasource';
import ProfileLocalDb, { type ProfileTable } from './db';

@singleton()
export class ProfileLocalDatasource implements ProfileDataSource {
  static readonly TOKEN = 'ProfileLocalDatasource';

  constructor(
    @inject(ProfileLocalDb.TOKEN) private readonly profiles: ProfileTable,
  ) {}

  async getProfiles(): Promise<ProfileEntity[]> {
    return this.profiles.toArray();
  }

  async getProfile(id: number): Promise<ProfileEntity | undefined> {
    return this.profiles.get(id);
  }

  async addProfile(profile: ProfileEntity): Promise<number> {
    return this.profiles.add(profile);
  }

  async updateProfile(
    id: number,
    profile: Partial<ProfileEntity>,
  ): Promise<void> {
    await this.profiles.update(id, profile);
  }

  async deleteProfile(id: number): Promise<void> {
    await this.profiles.delete(id);
  }

  async bulkAddProfiles(profiles: ProfileEntity[]): Promise<void> {
    await this.profiles.bulkAdd(profiles);
  }

  async clearProfiles(): Promise<void> {
    await this.profiles.clear();
  }
}
