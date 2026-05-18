import { describe, expect, it, vi } from 'vitest';
import type { GoalRepository } from '../goal-repository';
import { GetGoalsByProfileIdUsecase } from './get-goals-by-profile-id';

describe('GetGoalsByProfileIdUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository =
      {} as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.getByProfileId = vi
      .fn()
      .mockResolvedValue('mock-result' as any);

    const usecase = new GetGoalsByProfileIdUsecase(mockGoalRepository);
    const result = await usecase.run({ profileId: 1 });

    expect(mockGoalRepository.getByProfileId).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
