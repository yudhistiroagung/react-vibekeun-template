import { describe, expect, it, vi } from 'vitest';
import type { ProfileRepository } from '../profile-repository';
import { UpdateProfileUsecase } from './update-profile';

describe('UpdateProfileUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository =
      {} as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.update = vi
      .fn()
      .mockResolvedValue('mock-result' as any);

    const usecase = new UpdateProfileUsecase(mockProfileRepository);
    const result = await usecase.run({ id: 1, profile: {} });

    expect(mockProfileRepository.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
