import { describe, it, expect, vi } from 'vitest';
import { CreateGoalUsecase } from './create-goal';
import { GoalRepository } from '../goal-repository';

describe('CreateGoalUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository = {
    } as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.create = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new CreateGoalUsecase(mockGoalRepository);
    const result = await usecase.run({ goal:{}});

    expect(mockGoalRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
