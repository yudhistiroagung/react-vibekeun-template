export interface TodoDataSource<T> {
  getTodos(): Promise<T[]>;
  setTodos(todos: T[]): Promise<void>;
}
