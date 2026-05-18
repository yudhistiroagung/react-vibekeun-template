import { describe, expect, it, vi } from 'vitest';
import type { GoalRepository } from '../goal-repository';
import { BulkAddGoalsUsecase } from './bulk-add-goals';

describe('BulkAddGoalsUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository =
      {} as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.bulkAdd = vi.fn().mockResolvedValue(undefined);

    const usecase = new BulkAddGoalsUsecase(mockGoalRepository);
    const result = await usecase.run({ goals: [] });

    expect(mockGoalRepository.bulkAdd).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
