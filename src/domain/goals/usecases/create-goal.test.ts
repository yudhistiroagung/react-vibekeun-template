import { describe, expect, it, vi } from 'vitest';
import type { GoalRepository } from '../goal-repository';
import { CreateGoalUsecase } from './create-goal';

describe('CreateGoalUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository =
      {} as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.create = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new CreateGoalUsecase(mockGoalRepository);
    const result = await usecase.run({ goal: {} as any });

    expect(mockGoalRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
