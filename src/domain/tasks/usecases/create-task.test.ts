import { describe, it, expect, vi } from 'vitest';
import { CreateTaskUsecase } from './create-task';
import { TaskRepository } from '../task-repository';

describe('CreateTaskUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository = {
    } as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.create = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new CreateTaskUsecase(mockTaskRepository);
    const result = await usecase.run({"task":{}});

    expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
