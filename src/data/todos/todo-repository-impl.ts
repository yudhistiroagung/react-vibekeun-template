import { inject, singleton } from 'tsyringe';

import type { TodoRepository } from '@/domain/todos/todo-repository';

import { TodoLocalDatasource } from './datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from './datasources/remote/todo-remote-datasource';
import { todoDomainToEntity, todoDtoToDomain, todoEntityToDomain } from './mapper/todo-mapper';

import type { TodoDataSource } from './datasources/todo-datasource';
import type { TodoEntity, TodoDto } from './models';

@singleton()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @inject(TodoLocalDatasource.TOKEN) private local: TodoDataSource<TodoEntity>,
    @inject(TodoRemoteDatasource.TOKEN) private remote: TodoDataSource<TodoDto>,
  ) {}

  async getTodos() {
    let todos = await (await this.local.getTodos()).map(todoEntityToDomain);

    if (todos.length === 0) {
      todos = (await this.remote.getTodos()).map(todoDtoToDomain);
      await this.local.setTodos(todos.map(todoDomainToEntity));
    }

    return todos;
  }
}
