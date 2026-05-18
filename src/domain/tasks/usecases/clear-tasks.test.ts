import { describe, expect, it, vi } from 'vitest';
import type { TaskRepository } from '../task-repository';
import { ClearTasksUsecase } from './clear-tasks';

describe('ClearTasksUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository =
      {} as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.clear = vi.fn().mockResolvedValue(undefined);

    const usecase = new ClearTasksUsecase(mockTaskRepository);
    const result = await usecase.run();

    expect(mockTaskRepository.clear).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
