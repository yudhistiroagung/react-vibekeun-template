import { inject, singleton } from 'tsyringe';

import { type TodoRepository } from '@/domain/todos/todo-repository';

import type { TodoDataSource } from './datasources/todo-datasource';
import { TodoLocalDatasource } from './datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from './datasources/remote/todo-remote-datasource';

@singleton()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @inject(TodoLocalDatasource.TOKEN) private local: TodoDataSource,
    @inject(TodoRemoteDatasource.TOKEN) private remote: TodoDataSource,
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
