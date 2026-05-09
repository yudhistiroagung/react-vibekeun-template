import { inject, singleton } from 'tsyringe';
import type { Todo } from '@/domain/todos/models/todo';
import type { TodoRepository } from '@/domain/todos/todo-repository';

import { TodoLocalDatasource } from './datasources/local/todo-local-datasource';
import { todoDomainToEntity, todoEntityToDomain } from './mapper/todo-mapper';

@singleton()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @inject(TodoLocalDatasource.TOKEN) private readonly local: TodoLocalDatasource,
  ) {}

  async getTodos(userId: string) {
    const todos = await this.local.getTodos(userId);
    return todos.map(todoEntityToDomain);
  }

  async createTodo(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> & { userId: string },
  ): Promise<Todo> {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.local.createTodo(todoDomainToEntity(newTodo));
    return newTodo;
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    const updatedTodo = { ...todo, updatedAt: new Date() };
    await this.local.updateTodo(todoDomainToEntity(updatedTodo));
    return updatedTodo;
  }

  async deleteTodo(id: string): Promise<void> {
    await this.local.deleteTodo(id);
  }
}
