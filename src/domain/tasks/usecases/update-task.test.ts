import { describe, it, expect, vi } from 'vitest';
import { UpdateTaskUsecase } from './update-task';
import { TaskRepository } from '../task-repository';

describe('UpdateTaskUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository = {
    } as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.update = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new UpdateTaskUsecase(mockTaskRepository);
    const result = await usecase.run({"id":1,"task":{}});

    expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
