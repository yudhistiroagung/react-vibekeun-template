import { describe, it, expect, vi } from 'vitest';
import { DeleteGoalUsecase } from './delete-goal';
import { GoalRepository } from '../goal-repository';

describe('DeleteGoalUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository = {
    } as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.delete = vi.fn().mockResolvedValue(undefined);

    const usecase = new DeleteGoalUsecase(mockGoalRepository);
    const result = await usecase.run({"id":1});

    expect(mockGoalRepository.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
