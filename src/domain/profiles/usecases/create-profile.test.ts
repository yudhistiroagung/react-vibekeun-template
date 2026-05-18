import { describe, it, expect, vi } from 'vitest';
import { CreateProfileUsecase } from './create-profile';
import { ProfileRepository } from '../profile-repository';

describe('CreateProfileUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository = {
    } as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.create = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new CreateProfileUsecase(mockProfileRepository);
    const result = await usecase.run({"profile":{}});

    expect(mockProfileRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
