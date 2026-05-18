import { describe, expect, it, vi } from 'vitest';
import type { ProfileRepository } from '../profile-repository';
import { GetAllProfilesUsecase } from './get-all-profiles';

describe('GetAllProfilesUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository =
      {} as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.getAll = vi
      .fn()
      .mockResolvedValue('mock-result' as any);

    const usecase = new GetAllProfilesUsecase(mockProfileRepository);
    const result = await usecase.run();

    expect(mockProfileRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
