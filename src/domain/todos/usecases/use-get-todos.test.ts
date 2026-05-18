import { describe, expect, it, vi } from 'vitest';
import type { TodoRepository } from '../todo-repository';
import { GetTodosUsecase } from './use-get-todos';

describe('GetTodosUsecase', () => {
  it('should execute successfully', async () => {
    const mockTodoRepository =
      {} as unknown as import('vitest').Mocked<TodoRepository>;

    mockTodoRepository.getTodos = vi
      .fn()
      .mockResolvedValue('mock-result' as any);

    const usecase = new GetTodosUsecase(mockTodoRepository);
    const result = await usecase.run();

    expect(mockTodoRepository.getTodos).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
