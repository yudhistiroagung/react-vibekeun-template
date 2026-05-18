import { describe, expect, it, vi } from 'vitest';
import type { ProfileRepository } from '../profile-repository';
import { BulkAddProfilesUsecase } from './bulk-add-profiles';

describe('BulkAddProfilesUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository =
      {} as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.bulkAdd = vi.fn().mockResolvedValue(undefined);

    const usecase = new BulkAddProfilesUsecase(mockProfileRepository);
    const result = await usecase.run({ profiles: [] });

    expect(mockProfileRepository.bulkAdd).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
