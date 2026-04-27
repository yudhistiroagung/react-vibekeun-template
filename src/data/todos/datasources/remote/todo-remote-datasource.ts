import { injectable } from 'tsyringe';

import type { TodoDataSource } from '../todo-datasource';
import type { Todo } from '@/domain/todos/models';

@injectable()
export class TodoRemoteDatasource implements TodoDataSource {
  static readonly TOKEN = 'TodoRemoteDatasource';

  async setTodos(_todos: Todo[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getTodos() {
    return [];
  }
}
