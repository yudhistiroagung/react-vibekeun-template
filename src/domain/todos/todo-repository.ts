import type { Todo } from './models/todo';

export interface TodoRepository {
  getTodos: () => Promise<Todo[]>;
}
