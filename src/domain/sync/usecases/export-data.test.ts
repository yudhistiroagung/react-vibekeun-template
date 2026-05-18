import { describe, expect, it, vi } from 'vitest';
import type { GoalRepository } from '@/domain/goals/goal-repository';
import type { ProfileRepository } from '@/domain/profiles/profile-repository';
import type { TaskRepository } from '@/domain/tasks/task-repository';
import { ExportDataUsecase } from './export-data';

describe('ExportDataUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository =
      {} as unknown as import('vitest').Mocked<ProfileRepository>;
    const mockGoalRepository =
      {} as unknown as import('vitest').Mocked<GoalRepository>;
    const mockTaskRepository =
      {} as unknown as import('vitest').Mocked<TaskRepository>;

    mockProfileRepository.getAll = vi.fn().mockResolvedValue([]);
    mockGoalRepository.getAll = vi.fn().mockResolvedValue([]);
    mockTaskRepository.getAll = vi.fn().mockResolvedValue([]);

    const usecase = new ExportDataUsecase(
      mockProfileRepository,
      mockGoalRepository,
      mockTaskRepository,
    );
    const result = await usecase.run();

    expect(mockProfileRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockGoalRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
