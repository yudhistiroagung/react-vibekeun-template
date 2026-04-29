import { inject, singleton } from 'tsyringe';

import type { Todo } from '@/domain/todos/models';
import { type TodoTable, TodoLocalDB } from './db';

import { type TodoDataSource } from '../todo-datasource';

@singleton()
export class TodoLocalDatasource implements TodoDataSource {
  static readonly TOKEN = 'TodoLocalDatasource';

  constructor(@inject(TodoLocalDB) private readonly todos: TodoTable) {}

  async setTodos(todos: Todo[]): Promise<void> {
    return this.todos.bulkAdd(todos);
  }

  async getTodos() {
    return this.todos.toArray();
  }
}
