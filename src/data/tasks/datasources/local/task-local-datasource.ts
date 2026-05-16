import { inject, singleton } from 'tsyringe';

import type { TaskEntity } from '../../models/task-entity';
import type { TaskDataSource } from '../task-datasource';
import TaskLocalDb, { type TaskTable } from './db';

@singleton()
export class TaskLocalDatasource implements TaskDataSource {
  static readonly TOKEN = 'TaskLocalDatasource';

  constructor(@inject(TaskLocalDb.TOKEN) private readonly tasks: TaskTable) {}

  async getTasks(): Promise<TaskEntity[]> {
    return this.tasks.toArray();
  }

  async bulkAddTasks(tasks: TaskEntity[]): Promise<void> {
    await this.tasks.bulkAdd(tasks);
  }

  async clearTasks(): Promise<void> {
    await this.tasks.clear();
  }
}
