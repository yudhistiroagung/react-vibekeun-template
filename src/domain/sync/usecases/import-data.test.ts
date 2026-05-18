import { describe, it, expect, vi } from 'vitest';
import { ImportDataUsecase } from './import-data';
import { ProfileRepository } from '@/domain/profiles/profile-repository';
import { GoalRepository } from '@/domain/goals/goal-repository';
import { TaskRepository } from '@/domain/tasks/task-repository';

describe('ImportDataUsecase', () => {
  it('should execute successfully', async () => {
    const mockProfileRepository = {
    } as unknown as import('vitest').Mocked<ProfileRepository>;
    const mockGoalRepository = {
    } as unknown as import('vitest').Mocked<GoalRepository>;
    const mockTaskRepository = {
    } as unknown as import('vitest').Mocked<TaskRepository>;

    mockProfileRepository.clear = vi.fn();
    mockGoalRepository.clear = vi.fn();
    mockTaskRepository.clear = vi.fn();

    const usecase = new ImportDataUsecase(mockProfileRepository, mockGoalRepository, mockTaskRepository);
    const result = await usecase.run({ file: new File(['{}'], 'data.json') });

    expect(mockProfileRepository.clear).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
