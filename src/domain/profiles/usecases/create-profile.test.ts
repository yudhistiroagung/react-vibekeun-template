import { describe, expect, it, vi } from 'vitest';
import type { ProfileRepository } from '../profile-repository';
import { CreateProfileUsecase } from './create-profile';

describe('CreateProfileUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository =
      {} as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.create = vi
      .fn()
      .mockResolvedValue('mock-result' as any);

    const usecase = new CreateProfileUsecase(mockProfileRepository);
    const result = await usecase.run({ profile: {} as any });

    expect(mockProfileRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
