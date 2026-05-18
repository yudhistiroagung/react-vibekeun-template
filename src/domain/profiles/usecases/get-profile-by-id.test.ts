import { describe, it, expect, vi } from 'vitest';
import { GetProfileByIdUsecase } from './get-profile-by-id';
import { ProfileRepository } from '../profile-repository';

describe('GetProfileByIdUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository = {
    } as unknown as import('vitest').Mocked<ProfileRepository>;

    mockProfileRepository.getById = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new GetProfileByIdUsecase(mockProfileRepository);
    const result = await usecase.run({"id":1});

    expect(mockProfileRepository.getById).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
