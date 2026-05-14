import { inject, singleton } from 'tsyringe';
import type { TaskLog } from '@/domain/task-logs/models';
import type { TaskLogRepository } from '@/domain/task-logs/task-log-repository';
import { TaskLogLocalDatasource } from './datasources/local/task-log-local-datasource';
import type { TaskLogDataSource } from './datasources/task-log-datasource';
import { taskLogDomainToEntity, taskLogEntityToDomain } from './mapper';
import type { TaskLogEntity } from './models';

@singleton()
export class TaskLogRepositoryImpl implements TaskLogRepository {
  constructor(
    @inject(TaskLogLocalDatasource.TOKEN)
    private local: TaskLogDataSource<TaskLogEntity>,
  ) {}

  async getTaskLogsByProfile(profileId: number): Promise<TaskLog[]> {
    const taskLogs = await this.local.getTaskLogsByProfile(profileId);
    return taskLogs.map(taskLogEntityToDomain);
  }

  async createTaskLog(taskLog: Omit<TaskLog, 'id'>): Promise<number> {
    return this.local.createTaskLog(taskLogDomainToEntity(taskLog as TaskLog));
  }

  async deleteTaskLog(id: number): Promise<void> {
    return this.local.deleteTaskLog(id);
  }
}
