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

  async getTasksByProfileId(profileId: number): Promise<TaskEntity[]> {
    return this.tasks.where('profileId').equals(profileId).toArray();
  }

  async getTasksByProfileAndDate(
    profileId: number,
    date: string,
  ): Promise<TaskEntity[]> {
    return this.tasks
      .where('profileId')
      .equals(profileId)
      .filter((t) => t.date === date)
      .toArray();
  }

  async createTask(task: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
    const id = await this.tasks.add(task as TaskEntity);
    return { ...task, id } as TaskEntity;
  }

  async updateTask(id: number, task: Partial<TaskEntity>): Promise<TaskEntity> {
    await this.tasks.update(id, task);
    const updated = await this.tasks.get(id);
    if (!updated) throw new Error(`Task with id ${id} not found`);
    return updated;
  }

  async bulkAddTasks(tasks: TaskEntity[]): Promise<void> {
    await this.tasks.bulkAdd(tasks);
  }

  async clearTasks(): Promise<void> {
    await this.tasks.clear();
  }
}
