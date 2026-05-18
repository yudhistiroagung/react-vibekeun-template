import { describe, it, expect, vi } from 'vitest';
import { GetAllTasksUsecase } from './get-all-tasks';
import { TaskRepository } from '../task-repository';

describe('GetAllTasksUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository = {
    } as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.getAll = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new GetAllTasksUsecase(mockTaskRepository);
    const result = await usecase.run();

    expect(mockTaskRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
