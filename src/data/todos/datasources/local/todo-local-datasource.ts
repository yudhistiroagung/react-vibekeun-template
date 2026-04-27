import { injectable } from 'tsyringe';

import type { Todo } from '@/domain/todos/models';

import { type TodoDataSource } from '../todo-datasource';

@injectable()
export class TodoLocalDatasource implements TodoDataSource {
  static readonly TOKEN = 'TodoLocalDatasource';

  async setTodos(_todos: Todo[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getTodos() {
    return [];
  }
}
