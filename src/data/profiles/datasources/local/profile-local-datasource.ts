import { inject, singleton } from 'tsyringe';
import type { ProfileEntity } from '../../models';
import type { ProfileDataSource } from '../profile-datasource';
import ProfileLocalDb, { type ProfileTable } from './db';

@singleton()
export class ProfileLocalDatasource
  implements ProfileDataSource<ProfileEntity>
{
  static readonly TOKEN = 'ProfileLocalDatasource';

  constructor(
    @inject(ProfileLocalDb.TOKEN) private readonly profiles: ProfileTable,
  ) {}

  async getProfiles() {
    return this.profiles.toArray();
  }

  async getDefaultProfile() {
    return this.profiles.where({ isDefault: true }).first();
  }

  async createProfile(profile: Omit<ProfileEntity, 'id'>) {
    return this.profiles.add(profile as ProfileEntity);
  }

  async updateProfile(id: number, changes: Partial<ProfileEntity>) {
    return this.profiles.update(id, changes);
  }
}
