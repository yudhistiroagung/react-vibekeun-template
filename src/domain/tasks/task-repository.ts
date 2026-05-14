import type { Task } from './models';

export interface TaskRepository {
  getTasksByProfile: (profileId: number) => Promise<Task[]>;
  createTask: (task: Omit<Task, 'id'>) => Promise<number>;
  updateTask: (id: number, task: Partial<Task>) => Promise<number>;
  deleteTask: (id: number) => Promise<void>;
}
