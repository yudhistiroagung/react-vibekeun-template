import { inject, singleton } from 'tsyringe';

import type { TodoEntity } from '../../models/todo-entity';
import type { TodoDataSource } from '../todo-datasource';
import TodoLocalDb, { type TodoTable } from './db';

@singleton()
export class TodoLocalDatasource implements TodoDataSource<TodoEntity> {
  static readonly TOKEN = 'TodoLocalDatasource';

  constructor(@inject(TodoLocalDb.TOKEN) private readonly todos: TodoTable) {}

  async setTodos(todos: TodoEntity[]): Promise<void> {
    return this.todos.bulkAdd(todos);
  }

  async getTodos() {
    return this.todos.toArray();
  }
}
