export interface TaskDataSource<T> {
  getTasksByProfile(profileId: number): Promise<T[]>;
  createTask(task: Omit<T, 'id'>): Promise<number>;
  updateTask(id: number, task: Partial<T>): Promise<number>;
  deleteTask(id: number): Promise<void>;
}
