import { describe, expect, it, vi } from 'vitest';
import type { ProfileRepository } from '../profile-repository';
import { DeleteProfileUsecase } from './delete-profile';

describe('DeleteProfileUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository =
      {} as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.delete = vi.fn().mockResolvedValue(undefined);

    const usecase = new DeleteProfileUsecase(mockProfileRepository);
    const result = await usecase.run({ id: 1 });

    expect(mockProfileRepository.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
