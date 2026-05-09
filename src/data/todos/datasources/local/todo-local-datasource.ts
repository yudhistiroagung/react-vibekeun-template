import { inject, singleton } from 'tsyringe';

import type { TodoEntity } from '../../models/todo-entity';
import TodoLocalDb, { type TodoTable } from './db';

@singleton()
export class TodoLocalDatasource {
  static readonly TOKEN = 'TodoLocalDatasource';

  constructor(@inject(TodoLocalDb.TOKEN) private readonly todos: TodoTable) {}

  async setTodos(todos: TodoEntity[]): Promise<void> {
    return this.todos.bulkAdd(todos);
  }

  async getTodos(userId: string) {
    return this.todos.where('userId').equals(userId).toArray();
  }

  async createTodo(todo: TodoEntity): Promise<void> {
    await this.todos.add(todo);
  }

  async updateTodo(todo: TodoEntity): Promise<void> {
    await this.todos.put(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.todos.delete(id);
  }
}
