import { describe, expect, it } from 'vitest';
import { TodoRemoteDatasource } from './todo-remote-datasource';
import type { TodoEntity } from '../../models';

describe('TodoRemoteDatasource', () => {
  const datasource = new TodoRemoteDatasource();

  it('should get todos as empty array', async () => {
    const result = await datasource.getTodos();
    expect(result).toEqual([]);
  });

  it('should set todos and resolve', async () => {
    const mockTodos: TodoEntity[] = [
      { id: 1, name: 'Todo 1', description: 'Desc', status: 'pending', created_at: 123, updated_at: 123 },
    ];
    await expect(datasource.setTodos(mockTodos)).resolves.toBeUndefined();
  });
});
