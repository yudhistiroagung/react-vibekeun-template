import { describe, it, expect, vi } from 'vitest';
import { GetAllGoalsUsecase } from './get-all-goals';
import { GoalRepository } from '../goal-repository';

describe('GetAllGoalsUsecase', () => {
  it('should execute successfully', async () => {
    const mockGoalRepository = {
    } as unknown as import('vitest').Mocked<GoalRepository>;

    mockGoalRepository.getAll = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new GetAllGoalsUsecase(mockGoalRepository);
    const result = await usecase.run();

    expect(mockGoalRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
