import { describe, expect, it, vi } from 'vitest';
import type { TaskRepository } from '../task-repository';
import { BulkAddTasksUsecase } from './bulk-add-tasks';

describe('BulkAddTasksUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository =
      {} as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.bulkAdd = vi.fn().mockResolvedValue(undefined);

    const usecase = new BulkAddTasksUsecase(mockTaskRepository);
    const result = await usecase.run({ tasks: [] });

    expect(mockTaskRepository.bulkAdd).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
