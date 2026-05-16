import { inject, singleton } from 'tsyringe';
import { AppDatabase } from '@/cores/dexie/db-dexie';
import type { Task } from '@/domain/tasks/models/task';
import type { TaskRepository } from '@/domain/tasks/task-repository';
import { taskDomainToEntity, taskEntityToDomain } from './mapper/task-mapper';

@singleton()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(@inject(AppDatabase) private readonly db: AppDatabase) {}

  async getAll(): Promise<Task[]> {
    const tasks = await this.db.tasks.toArray();
    return tasks.map(taskEntityToDomain);
  }

  async bulkAdd(tasks: Task[]): Promise<void> {
    const entities = tasks.map(taskDomainToEntity);
    await this.db.tasks.bulkAdd(entities);
  }

  async clear(): Promise<void> {
    await this.db.tasks.clear();
  }
}
