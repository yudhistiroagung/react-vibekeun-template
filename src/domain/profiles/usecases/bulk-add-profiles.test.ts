import { describe, it, expect, vi } from 'vitest';
import { BulkAddProfilesUsecase } from './bulk-add-profiles';
import { ProfileRepository } from '../profile-repository';

describe('BulkAddProfilesUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository = {
    } as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.bulkAdd = vi.fn().mockResolvedValue(undefined);

    const usecase = new BulkAddProfilesUsecase(mockProfileRepository);
    const result = await usecase.run({"profiles":{}});

    expect(mockProfileRepository.bulkAdd).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
