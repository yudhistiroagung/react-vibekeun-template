import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProfileLocalDatasource } from './profile-local-datasource';
import type { ProfileEntity } from '../../models/profile-entity';

describe('ProfileLocalDatasource', () => {
  let mockTable: any;
  let datasource: ProfileLocalDatasource;

  beforeEach(() => {
    mockTable = {
      toArray: vi.fn(),
      get: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      bulkAdd: vi.fn(),
      clear: vi.fn(),
    };
    datasource = new ProfileLocalDatasource(mockTable);
  });

  it('should get all profiles', async () => {
    const mockProfiles: ProfileEntity[] = [
      { id: 1, name: 'Profile 1', createdAt: 123 },
    ];
    mockTable.toArray.mockResolvedValue(mockProfiles);

    const result = await datasource.getProfiles();

    expect(result).toEqual(mockProfiles);
    expect(mockTable.toArray).toHaveBeenCalledTimes(1);
  });

  it('should get a profile by id', async () => {
    const mockProfile: ProfileEntity = { id: 1, name: 'Profile 1', createdAt: 123 };
    mockTable.get.mockResolvedValue(mockProfile);

    const result = await datasource.getProfile(1);

    expect(result).toEqual(mockProfile);
    expect(mockTable.get).toHaveBeenCalledWith(1);
  });

  it('should add a profile', async () => {
    const mockProfile: ProfileEntity = { name: 'Profile 1', createdAt: 123 };
    mockTable.add.mockResolvedValue(1);

    const result = await datasource.addProfile(mockProfile);

    expect(result).toBe(1);
    expect(mockTable.add).toHaveBeenCalledWith(mockProfile);
  });

  it('should update a profile', async () => {
    mockTable.update.mockResolvedValue(1);

    await datasource.updateProfile(1, { name: 'Updated' });

    expect(mockTable.update).toHaveBeenCalledWith(1, { name: 'Updated' });
  });

  it('should delete a profile', async () => {
    mockTable.delete.mockResolvedValue(undefined);

    await datasource.deleteProfile(1);

    expect(mockTable.delete).toHaveBeenCalledWith(1);
  });

  it('should bulk add profiles', async () => {
    const mockProfiles: ProfileEntity[] = [
      { id: 1, name: 'Profile 1', createdAt: 123 },
    ];
    mockTable.bulkAdd.mockResolvedValue(undefined);

    await datasource.bulkAddProfiles(mockProfiles);

    expect(mockTable.bulkAdd).toHaveBeenCalledWith(mockProfiles);
  });

  it('should clear profiles', async () => {
    mockTable.clear.mockResolvedValue(undefined);

    await datasource.clearProfiles();

    expect(mockTable.clear).toHaveBeenCalledTimes(1);
  });
});
