import { singleton } from 'tsyringe';

import type { TodoEntity } from '../../models';
import type { TodoDataSource } from '../todo-datasource';

@singleton()
export class TodoRemoteDatasource implements TodoDataSource<TodoEntity> {
  static readonly TOKEN = 'TodoRemoteDatasource';

  async setTodos(_todos: TodoEntity[]): Promise<void> {
    // TODO get todos from remote using axios
    return Promise.resolve();
  }

  async getTodos() {
    return Promise.resolve([]);
  }
}
