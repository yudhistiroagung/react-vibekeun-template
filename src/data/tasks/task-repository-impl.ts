import { inject, singleton } from 'tsyringe';
import type { Task } from '@/domain/tasks/models/task';
import type { TaskRepository } from '@/domain/tasks/task-repository';
import { TaskLocalDatasource } from './datasources/local/task-local-datasource';
import type { TaskDataSource } from './datasources/task-datasource';
import { taskDomainToEntity, taskEntityToDomain } from './mapper/task-mapper';

@singleton()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @inject(TaskLocalDatasource.TOKEN) private readonly local: TaskDataSource,
  ) {}

  async getAll(): Promise<Task[]> {
    const entities = await this.local.getTasks();
    return entities.map(taskEntityToDomain);
  }

  async bulkAdd(tasks: Task[]): Promise<void> {
    const entities = tasks.map(taskDomainToEntity);
    await this.local.bulkAddTasks(entities);
  }

  async clear(): Promise<void> {
    await this.local.clearTasks();
  }
}
