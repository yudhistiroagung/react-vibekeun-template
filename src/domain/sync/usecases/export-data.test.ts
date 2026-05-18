import { describe, it, expect, vi } from 'vitest';
import { ExportDataUsecase } from './export-data';
import { ProfileRepository } from '@/domain/profiles/profile-repository';
import { GoalRepository } from '@/domain/goals/goal-repository';
import { TaskRepository } from '@/domain/tasks/task-repository';

describe('ExportDataUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository = {
    } as unknown as import('vitest').Mocked<ProfileRepository>;
    const mockGoalRepository = {
    } as unknown as import('vitest').Mocked<GoalRepository>;
    const mockTaskRepository = {
    } as unknown as import('vitest').Mocked<TaskRepository>;

    mockProfileRepository.getAll = vi.fn().mockResolvedValue([]);
    mockGoalRepository.getAll = vi.fn().mockResolvedValue([]);
    mockTaskRepository.getAll = vi.fn().mockResolvedValue([]);

    const usecase = new ExportDataUsecase(mockProfileRepository, mockGoalRepository, mockTaskRepository);
    const result = await usecase.run();

    expect(mockProfileRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockGoalRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
