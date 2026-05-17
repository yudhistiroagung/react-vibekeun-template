import type { TaskEntity } from '../models/task-entity';

export interface TaskDataSource {
  getTasks(): Promise<TaskEntity[]>;
  getTasksByProfileAndDate(profileId: number, date: string): Promise<TaskEntity[]>;
  createTask(task: Omit<TaskEntity, 'id'>): Promise<TaskEntity>;
  updateTask(id: number, task: Partial<TaskEntity>): Promise<TaskEntity>;
  bulkAddTasks(tasks: TaskEntity[]): Promise<void>;
  clearTasks(): Promise<void>;
}
