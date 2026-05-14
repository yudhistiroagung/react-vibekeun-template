import { inject, singleton } from 'tsyringe';
import type { TaskLogEntity } from '../../models';
import type { TaskLogDataSource } from '../task-log-datasource';
import TaskLogLocalDb, { type TaskLogTable } from './db';

@singleton()
export class TaskLogLocalDatasource
  implements TaskLogDataSource<TaskLogEntity>
{
  static readonly TOKEN = 'TaskLogLocalDatasource';

  constructor(
    @inject(TaskLogLocalDb.TOKEN) private readonly taskLogs: TaskLogTable,
  ) {}

  async getTaskLogsByProfile(profileId: number) {
    return this.taskLogs.where({ profileId }).toArray();
  }

  async createTaskLog(taskLog: Omit<TaskLogEntity, 'id'>) {
    return this.taskLogs.add(taskLog as TaskLogEntity);
  }

  async deleteTaskLog(id: number) {
    return this.taskLogs.delete(id);
  }
}
