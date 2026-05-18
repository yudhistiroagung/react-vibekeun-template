import { describe, expect, it, vi } from 'vitest';
import type { TaskRepository } from '../task-repository';
import { GetAllTasksUsecase } from './get-all-tasks';

describe('GetAllTasksUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository =
      {} as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.getAll = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new GetAllTasksUsecase(mockTaskRepository);
    const result = await usecase.run();

    expect(mockTaskRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
