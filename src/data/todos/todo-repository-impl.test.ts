import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TodoRepositoryImpl } from './todo-repository-impl';
import type { TodoEntity, TodoDto } from './models';

describe('TodoRepositoryImpl', () => {
  let mockLocalDatasource: any;
  let mockRemoteDatasource: any;
  let repository: TodoRepositoryImpl;

  beforeEach(() => {
    mockLocalDatasource = {
      getTodos: vi.fn(),
      setTodos: vi.fn(),
    };
    mockRemoteDatasource = {
      getTodos: vi.fn(),
      setTodos: vi.fn(),
    };
    repository = new TodoRepositoryImpl(mockLocalDatasource, mockRemoteDatasource);
  });

  it('should get todos from local datasource if available', async () => {
    const mockLocalEntities: TodoEntity[] = [
      { id: '1', name: 'Todo 1', description: 'Desc', status: false, created_at: new Date(123), updated_at: new Date(123) },
    ];
    mockLocalDatasource.getTodos.mockResolvedValue(mockLocalEntities);

    const result = await repository.getTodos();

    expect(result).toEqual([
      { id: 1, name: 'Todo 1', description: 'Desc', status: 'pending', createdAt: 123, updatedAt: 123 },
    ]);
    expect(mockLocalDatasource.getTodos).toHaveBeenCalledTimes(1);
    expect(mockRemoteDatasource.getTodos).not.toHaveBeenCalled();
  });

  it('should get todos from remote and save to local if local is empty', async () => {
    mockLocalDatasource.getTodos.mockResolvedValue([]);
    const mockRemoteDtos: TodoDto[] = [
      { id: '1', name: 'Remote Todo 1', description: 'Desc', status: false, created_at: new Date(123), updated_at: new Date(123) },
    ];
    mockRemoteDatasource.getTodos.mockResolvedValue(mockRemoteDtos);
    mockLocalDatasource.setTodos.mockResolvedValue(undefined);

    const result = await repository.getTodos();

    expect(result).toEqual([
      { id: 1, name: 'Remote Todo 1', description: 'Desc', status: 'pending', createdAt: 123, updatedAt: 123 },
    ]);
    expect(mockLocalDatasource.getTodos).toHaveBeenCalledTimes(1);
    expect(mockRemoteDatasource.getTodos).toHaveBeenCalledTimes(1);
    expect(mockLocalDatasource.setTodos).toHaveBeenCalledWith([
      { id: 1, name: 'Remote Todo 1', description: 'Desc', status: 'pending', created_at: 123, updated_at: 123 },
    ]);
  });
});
