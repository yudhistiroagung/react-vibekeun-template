import { singleton } from 'tsyringe';

import type { TodoDataSource } from '../todo-datasource';
import type { Todo } from '@/domain/todos/models';

@singleton()
export class TodoRemoteDatasource implements TodoDataSource {
  static readonly TOKEN = 'TodoRemoteDatasource';

  async setTodos(_todos: Todo[]): Promise<void> {
    // do nothing
  }

  async getTodos() {
    return [];
  }
}
