import type { Todo } from '@/domain/todos/models/todo';

export interface TodoDataSource {
  getTodos(): Promise<Todo[]>;
  setTodos(todos: Todo[]): Promise<void>;
}
