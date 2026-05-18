import { describe, expect, it } from 'vitest';
import type { TodoDto } from '../../models';
import { TodoRemoteDatasource } from './todo-remote-datasource';

describe('TodoRemoteDatasource', () => {
  const datasource = new TodoRemoteDatasource();

  it('should get todos as empty array', async () => {
    const result = await datasource.getTodos();
    expect(result).toEqual([]);
  });

  it('should set todos and resolve', async () => {
    const mockTodos: TodoDto[] = [
      {
        id: '1',
        name: 'Todo 1',
        description: 'Desc',
        status: false,
        created_at: new Date(123),
        updated_at: new Date(123),
      },
    ];
    await expect(datasource.setTodos(mockTodos)).resolves.toBeUndefined();
  });
});
