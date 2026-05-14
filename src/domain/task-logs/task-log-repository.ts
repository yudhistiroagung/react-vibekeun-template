import type { TaskLog } from './models';

export interface TaskLogRepository {
  getTaskLogsByProfile: (profileId: number) => Promise<TaskLog[]>;
  createTaskLog: (taskLog: Omit<TaskLog, 'id'>) => Promise<number>;
  deleteTaskLog: (id: number) => Promise<void>;
}
