import { type TodoRepository } from '@/domain/todos/todo-repository';

import type { TodoDataSource } from './datasources/todo-datasource';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    private readonly local: TodoDataSource,
    private readonly remote: TodoDataSource,
  ) {}

  async getTodos() {
    let todos = await this.local.getTodos();

    if (todos.length === 0) {
      todos = await this.remote.getTodos();
      await this.local.setTodos(todos);
    }

    return todos;
  }
}
