import { inject, singleton } from 'tsyringe';
import type { Task } from '@/domain/tasks/models/task';
import { TaskRepository } from '@/domain/tasks/task-repository';
import { TaskLocalDatasource } from './datasources/local/task-local-datasource';
import type { TaskDataSource } from './datasources/task-datasource';
import { taskDomainToEntity, taskEntityToDomain } from './mapper/task-mapper';

@singleton()
export class TaskRepositoryImpl implements TaskRepository {
  static readonly TOKEN = TaskRepository.TOKEN;

  constructor(
    @inject(TaskLocalDatasource.TOKEN) private readonly local: TaskDataSource,
  ) {}

  async getAll(): Promise<Task[]> {
    const entities = await this.local.getTasks();
    return entities.map(taskEntityToDomain);
  }

  async getByProfileId(profileId: number): Promise<Task[]> {
    const entities = await this.local.getTasksByProfileId(profileId);
    return entities.map(taskEntityToDomain);
  }

  async getByProfileIdAndDate(
    profileId: number,
    date: string,
  ): Promise<Task[]> {
    const entities = await this.local.getTasksByProfileAndDate(profileId, date);
    return entities.map(taskEntityToDomain);
  }

  async create(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const entity = await this.local.createTask({
      ...task,
      createdAt: Date.now(),
    });
    return taskEntityToDomain(entity);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    const entity = await this.local.updateTask(id, task);
    return taskEntityToDomain(entity);
  }

  async bulkAdd(tasks: Task[]): Promise<void> {
    const entities = tasks.map(taskDomainToEntity);
    await this.local.bulkAddTasks(entities);
  }

  async clear(): Promise<void> {
    await this.local.clearTasks();
  }
}
