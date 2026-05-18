import { describe, it, expect, vi } from 'vitest';
import { UpdateProfileUsecase } from './update-profile';
import { ProfileRepository } from '../profile-repository';

describe('UpdateProfileUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository = {
    } as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.update = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new UpdateProfileUsecase(mockProfileRepository);
    const result = await usecase.run({"id":1,"profile":{}});

    expect(mockProfileRepository.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
