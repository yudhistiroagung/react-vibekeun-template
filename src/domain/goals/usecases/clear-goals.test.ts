import { describe, expect, it, vi } from 'vitest';
import type { GoalRepository } from '../goal-repository';
import { ClearGoalsUsecase } from './clear-goals';

describe('ClearGoalsUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository =
      {} as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.clear = vi.fn().mockResolvedValue(undefined);

    const usecase = new ClearGoalsUsecase(mockGoalRepository);
    const result = await usecase.run();

    expect(mockGoalRepository.clear).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
