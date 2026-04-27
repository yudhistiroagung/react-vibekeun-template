export interface TodoDataSource {
  getTodos(): Promise<any[]>;
}
