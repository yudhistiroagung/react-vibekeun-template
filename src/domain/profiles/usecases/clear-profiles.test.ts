import { describe, expect, it, vi } from 'vitest';
import type { ProfileRepository } from '../profile-repository';
import { ClearProfilesUsecase } from './clear-profiles';

describe('ClearProfilesUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository =
      {} as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.clear = vi.fn().mockResolvedValue(undefined);

    const usecase = new ClearProfilesUsecase(mockProfileRepository);
    const result = await usecase.run();

    expect(mockProfileRepository.clear).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
