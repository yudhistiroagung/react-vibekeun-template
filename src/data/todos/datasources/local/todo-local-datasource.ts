import { type TodoDataSource } from '../todo-datasource';

export class TodoLocalDatasource implements TodoDataSource {
  async getTodos() {
    return [];
  }
}
