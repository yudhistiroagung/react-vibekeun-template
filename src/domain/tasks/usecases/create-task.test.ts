import { describe, expect, it, vi } from 'vitest';
import type { TaskRepository } from '../task-repository';
import { CreateTaskUsecase } from './create-task';

describe('CreateTaskUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository =
      {} as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.create = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new CreateTaskUsecase(mockTaskRepository);
    const result = await usecase.run({ task: {} as any });

    expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
