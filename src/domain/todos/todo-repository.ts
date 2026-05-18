import type { Todo } from './models/todo';

export interface TodoRepository {
  getTodos: () => Promise<Todo[]>;
}

export namespace TodoRepository {
  export const TOKEN = 'TodoRepository';
}
