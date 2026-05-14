import { inject, singleton } from 'tsyringe';
import type { Task } from '@/domain/tasks/models';
import type { TaskRepository } from '@/domain/tasks/task-repository';
import { TaskLocalDatasource } from './datasources/local/task-local-datasource';
import type { TaskDataSource } from './datasources/task-datasource';
import { taskDomainToEntity, taskEntityToDomain } from './mapper';
import type { TaskEntity } from './models';

@singleton()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @inject(TaskLocalDatasource.TOKEN)
    private local: TaskDataSource<TaskEntity>,
  ) {}

  async getTasksByProfile(profileId: number): Promise<Task[]> {
    const tasks = await this.local.getTasksByProfile(profileId);
    return tasks.map(taskEntityToDomain);
  }

  async createTask(task: Omit<Task, 'id'>): Promise<number> {
    return this.local.createTask(taskDomainToEntity(task as Task));
  }

  async updateTask(id: number, changes: Partial<Task>): Promise<number> {
    return this.local.updateTask(id, changes);
  }

  async deleteTask(id: number): Promise<void> {
    return this.local.deleteTask(id);
  }
}
