import type { Todo } from './models/todo';

export interface TodoRepository {
  getTodos(userId: string): Promise<Todo[]>;
  createTodo(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> & { userId: string },
  ): Promise<Todo>;
  updateTodo(todo: Todo): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}
