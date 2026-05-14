import { inject, singleton } from 'tsyringe';
import type { TaskEntity } from '../../models';
import type { TaskDataSource } from '../task-datasource';
import TaskLocalDb, { type TaskTable } from './db';

@singleton()
export class TaskLocalDatasource implements TaskDataSource<TaskEntity> {
  static readonly TOKEN = 'TaskLocalDatasource';

  constructor(@inject(TaskLocalDb.TOKEN) private readonly tasks: TaskTable) {}

  async getTasksByProfile(profileId: number) {
    return this.tasks.where({ profileId }).toArray();
  }

  async createTask(task: Omit<TaskEntity, 'id'>) {
    return this.tasks.add(task as TaskEntity);
  }

  async updateTask(id: number, changes: Partial<TaskEntity>) {
    return this.tasks.update(id, changes);
  }

  async deleteTask(id: number) {
    return this.tasks.delete(id);
  }
}
