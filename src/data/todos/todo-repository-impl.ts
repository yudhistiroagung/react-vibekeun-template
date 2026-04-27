import { type TodoRepository } from '@/domain/todos/Todo-repository';

export class TodoRepositoryImpl implements TodoRepository {
  async getTodos() {
    return [];
  }
}
