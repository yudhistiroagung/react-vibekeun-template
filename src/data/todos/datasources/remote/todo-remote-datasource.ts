import { singleton } from 'tsyringe';
import type { Todo } from '@/domain/todos/models';
import type { TodoDataSource } from '../todo-datasource';

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
