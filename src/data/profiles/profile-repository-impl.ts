import { inject, singleton } from 'tsyringe';
import type { Profile } from '@/domain/profiles/models';
import type { ProfileRepository } from '@/domain/profiles/profile-repository';
import { ProfileLocalDatasource } from './datasources/local/profile-local-datasource';
import type { ProfileDataSource } from './datasources/profile-datasource';
import { profileDomainToEntity, profileEntityToDomain } from './mapper';
import type { ProfileEntity } from './models';

@singleton()
export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(
    @inject(ProfileLocalDatasource.TOKEN)
    private local: ProfileDataSource<ProfileEntity>,
  ) {}

  async getProfiles(): Promise<Profile[]> {
    const profiles = await this.local.getProfiles();
    return profiles.map(profileEntityToDomain);
  }

  async getDefaultProfile(): Promise<Profile | undefined> {
    const profile = await this.local.getDefaultProfile();
    return profile ? profileEntityToDomain(profile) : undefined;
  }

  async createProfile(profile: Omit<Profile, 'id'>): Promise<number> {
    return this.local.createProfile(profileDomainToEntity(profile as Profile));
  }

  async updateProfile(id: number, changes: Partial<Profile>): Promise<number> {
    return this.local.updateProfile(id, changes);
  }
}
