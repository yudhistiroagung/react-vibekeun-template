import type { TodoDataSource } from '../todo-datasource';

export class TodoRemoteDatasource implements TodoDataSource {
  async getTodos() {
    return [];
  }
}
