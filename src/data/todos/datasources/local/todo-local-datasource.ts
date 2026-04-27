import { singleton } from 'tsyringe';

import type { Todo } from '@/domain/todos/models';

import { type TodoDataSource } from '../todo-datasource';

@singleton()
export class TodoLocalDatasource implements TodoDataSource {
  static readonly TOKEN = 'TodoLocalDatasource';

  async setTodos(_todos: Todo[]): Promise<void> {
    // do nothing
  }
  async getTodos() {
    return [];
  }
}
