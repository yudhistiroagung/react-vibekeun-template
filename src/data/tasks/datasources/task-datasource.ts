import type { TaskEntity } from '../models/task-entity';

export interface TaskDataSource {
  getTasks(): Promise<TaskEntity[]>;
  bulkAddTasks(tasks: TaskEntity[]): Promise<void>;
  clearTasks(): Promise<void>;
}
