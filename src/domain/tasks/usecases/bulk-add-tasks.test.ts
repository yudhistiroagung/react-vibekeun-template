import { describe, it, expect, vi } from 'vitest';
import { BulkAddTasksUsecase } from './bulk-add-tasks';
import { TaskRepository } from '../task-repository';

describe('BulkAddTasksUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository = {
    } as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.bulkAdd = vi.fn().mockResolvedValue(undefined);

    const usecase = new BulkAddTasksUsecase(mockTaskRepository);
    const result = await usecase.run({"tasks":{}});

    expect(mockTaskRepository.bulkAdd).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
