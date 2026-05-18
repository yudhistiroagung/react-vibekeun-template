import { describe, it, expect, vi } from 'vitest';
import { ClearGoalsUsecase } from './clear-goals';
import { GoalRepository } from '../goal-repository';

describe('ClearGoalsUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository = {
    } as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.clear = vi.fn().mockResolvedValue(undefined);

    const usecase = new ClearGoalsUsecase(mockGoalRepository);
    const result = await usecase.run();

    expect(mockGoalRepository.clear).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
