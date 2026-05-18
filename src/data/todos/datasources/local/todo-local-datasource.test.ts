import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TodoEntity } from '../../models/todo-entity';
import { TodoLocalDatasource } from './todo-local-datasource';

describe('TodoLocalDatasource', () => {
  let mockTable: any;
  let datasource: TodoLocalDatasource;

  beforeEach(() => {
    mockTable = {
      toArray: vi.fn(),
      bulkAdd: vi.fn(),
    };
    datasource = new TodoLocalDatasource(mockTable);
  });

  it('should get all todos', async () => {
    const mockTodos: TodoEntity[] = [
      {
        id: '1',
        name: 'Todo 1',
        description: 'Desc',
        status: false,
        created_at: new Date(123),
        updated_at: new Date(123),
      },
    ];
    mockTable.toArray.mockResolvedValue(mockTodos);

    const result = await datasource.getTodos();

    expect(result).toEqual(mockTodos);
    expect(mockTable.toArray).toHaveBeenCalledTimes(1);
  });

  it('should set todos using bulkAdd', async () => {
    const mockTodos: TodoEntity[] = [
      {
        id: '1',
        name: 'Todo 1',
        description: 'Desc',
        status: false,
        created_at: new Date(123),
        updated_at: new Date(123),
      },
    ];
    mockTable.bulkAdd.mockResolvedValue(undefined);

    await datasource.setTodos(mockTodos);

    expect(mockTable.bulkAdd).toHaveBeenCalledWith(mockTodos);
  });
});
