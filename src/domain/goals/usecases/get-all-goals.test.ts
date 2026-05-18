import { describe, expect, it, vi } from 'vitest';
import type { GoalRepository } from '../goal-repository';
import { GetAllGoalsUsecase } from './get-all-goals';

describe('GetAllGoalsUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository =
      {} as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.getAll = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new GetAllGoalsUsecase(mockGoalRepository);
    const result = await usecase.run();

    expect(mockGoalRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
