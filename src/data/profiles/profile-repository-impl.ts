import { inject, singleton } from 'tsyringe';
import type { Profile } from '@/domain/profiles/models/profile';
import { ProfileRepository } from '@/domain/profiles/profile-repository';
import { ProfileLocalDatasource } from './datasources/local/profile-local-datasource';
import type { ProfileDataSource } from './datasources/profile-datasource';
import {
  profileDomainToEntity,
  profileEntityToDomain,
} from './mapper/profile-mapper';

@singleton()
export class ProfileRepositoryImpl implements ProfileRepository {
  static readonly TOKEN = ProfileRepository.TOKEN;

  constructor(
    @inject(ProfileLocalDatasource.TOKEN)
    private readonly local: ProfileDataSource,
  ) {}

  async getAll(): Promise<Profile[]> {
    const entities = await this.local.getProfiles();
    return entities.map(profileEntityToDomain);
  }

  async getById(id: number): Promise<Profile | undefined> {
    const entity = await this.local.getProfile(id);
    return entity ? profileEntityToDomain(entity) : undefined;
  }

  async create(profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> {
    const now = Date.now();
    const id = await this.local.addProfile({
      ...profile,
      createdAt: now,
    });
    return {
      id,
      name: profile.name,
      createdAt: now,
    };
  }

  async update(id: number, profile: Partial<Profile>): Promise<Profile> {
    await this.local.updateProfile(id, profile);
    const updated = await this.getById(id);
    if (!updated) {
      throw new Error(`Profile ${id} not found after update`);
    }
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.local.deleteProfile(id);
  }

  async bulkAdd(profiles: Profile[]): Promise<void> {
    const entities = profiles.map(profileDomainToEntity);
    await this.local.bulkAddProfiles(entities);
  }

  async clear(): Promise<void> {
    await this.local.clearProfiles();
  }
}
