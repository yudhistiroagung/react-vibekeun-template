import { describe, expect, it, vi } from 'vitest';
import type { GoalRepository } from '../goal-repository';
import { UpdateGoalUsecase } from './update-goal';

describe('UpdateGoalUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository =
      {} as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.update = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new UpdateGoalUsecase(mockGoalRepository);
    const result = await usecase.run({ id: 1, goal: {} });

    expect(mockGoalRepository.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
