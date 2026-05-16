import type { Task } from './models/task';

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  bulkAdd(tasks: Task[]): Promise<void>;
  clear(): Promise<void>;
}
