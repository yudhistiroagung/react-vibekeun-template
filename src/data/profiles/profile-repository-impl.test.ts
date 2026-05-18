import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Profile } from '@/domain/profiles/models/profile';
import type { ProfileEntity } from './models/profile-entity';
import { ProfileRepositoryImpl } from './profile-repository-impl';

describe('ProfileRepositoryImpl', () => {
  let mockLocalDatasource: any;
  let repository: ProfileRepositoryImpl;

  beforeEach(() => {
    mockLocalDatasource = {
      getProfiles: vi.fn(),
      getProfile: vi.fn(),
      addProfile: vi.fn(),
      updateProfile: vi.fn(),
      deleteProfile: vi.fn(),
      bulkAddProfiles: vi.fn(),
      clearProfiles: vi.fn(),
    };
    repository = new ProfileRepositoryImpl(mockLocalDatasource);

    vi.useFakeTimers();
    vi.setSystemTime(new Date(123456789));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should get all profiles and map to domain models', async () => {
    const mockEntities: ProfileEntity[] = [
      { id: 1, name: 'Profile 1', createdAt: 123 },
    ];
    mockLocalDatasource.getProfiles.mockResolvedValue(mockEntities);

    const result = await repository.getAll();

    expect(result).toEqual([{ id: 1, name: 'Profile 1', createdAt: 123 }]);
    expect(mockLocalDatasource.getProfiles).toHaveBeenCalledTimes(1);
  });

  it('should get profile by id', async () => {
    const mockEntity: ProfileEntity = {
      id: 1,
      name: 'Profile 1',
      createdAt: 123,
    };
    mockLocalDatasource.getProfile.mockResolvedValue(mockEntity);

    const result = await repository.getById(1);

    expect(result).toEqual({ id: 1, name: 'Profile 1', createdAt: 123 });
    expect(mockLocalDatasource.getProfile).toHaveBeenCalledWith(1);
  });

  it('should return undefined if profile not found', async () => {
    mockLocalDatasource.getProfile.mockResolvedValue(undefined);

    const result = await repository.getById(1);

    expect(result).toBeUndefined();
  });

  it('should create a profile', async () => {
    const newProfile: Omit<Profile, 'id' | 'createdAt'> = {
      name: 'Profile 1',
    };

    mockLocalDatasource.addProfile.mockResolvedValue(1);

    const result = await repository.create(newProfile);

    expect(mockLocalDatasource.addProfile).toHaveBeenCalledWith({
      name: 'Profile 1',
      createdAt: 123456789,
    });
    expect(result).toEqual({
      id: 1,
      name: 'Profile 1',
      createdAt: 123456789,
    });
  });

  it('should update a profile', async () => {
    const updatedEntity: ProfileEntity = {
      id: 1,
      name: 'Updated Profile',
      createdAt: 123,
    };
    mockLocalDatasource.updateProfile.mockResolvedValue(undefined);
    mockLocalDatasource.getProfile.mockResolvedValue(updatedEntity);

    const result = await repository.update(1, { name: 'Updated Profile' });

    expect(mockLocalDatasource.updateProfile).toHaveBeenCalledWith(1, {
      name: 'Updated Profile',
    });
    expect(result).toEqual({ id: 1, name: 'Updated Profile', createdAt: 123 });
  });

  it('should throw error if profile not found after update', async () => {
    mockLocalDatasource.updateProfile.mockResolvedValue(undefined);
    mockLocalDatasource.getProfile.mockResolvedValue(undefined);

    await expect(
      repository.update(1, { name: 'Updated Profile' }),
    ).rejects.toThrow('Profile 1 not found after update');
  });

  it('should delete a profile', async () => {
    mockLocalDatasource.deleteProfile.mockResolvedValue(undefined);

    await repository.delete(1);

    expect(mockLocalDatasource.deleteProfile).toHaveBeenCalledWith(1);
  });

  it('should bulk add profiles', async () => {
    const mockProfiles: Profile[] = [
      { id: 1, name: 'Profile 1', createdAt: 123 },
    ];
    mockLocalDatasource.bulkAddProfiles.mockResolvedValue(undefined);

    await repository.bulkAdd(mockProfiles);

    expect(mockLocalDatasource.bulkAddProfiles).toHaveBeenCalledWith([
      { id: 1, name: 'Profile 1', createdAt: 123 },
    ]);
  });

  it('should clear profiles', async () => {
    mockLocalDatasource.clearProfiles.mockResolvedValue(undefined);

    await repository.clear();

    expect(mockLocalDatasource.clearProfiles).toHaveBeenCalledTimes(1);
  });
});
