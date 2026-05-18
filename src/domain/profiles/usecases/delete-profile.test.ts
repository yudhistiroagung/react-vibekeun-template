import { describe, it, expect, vi } from 'vitest';
import { DeleteProfileUsecase } from './delete-profile';
import { ProfileRepository } from '../profile-repository';

describe('DeleteProfileUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository = {
    } as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.delete = vi.fn().mockResolvedValue(undefined);

    const usecase = new DeleteProfileUsecase(mockProfileRepository);
    const result = await usecase.run({"id":1});

    expect(mockProfileRepository.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
