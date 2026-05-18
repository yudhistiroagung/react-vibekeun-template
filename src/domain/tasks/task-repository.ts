import type { Task } from './models/task';

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getByProfileIdAndDate(profileId: number, date: string): Promise<Task[]>;
  create(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task>;
  update(id: number, task: Partial<Task>): Promise<Task>;
  bulkAdd(tasks: Task[]): Promise<void>;
  clear(): Promise<void>;
}

export namespace TaskRepository {
  export const TOKEN = 'TaskRepository';
}
