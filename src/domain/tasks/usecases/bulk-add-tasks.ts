import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Task } from '../models/task';
import { TaskRepository } from '../task-repository';

type Input = {
  tasks: Task[];
};
type Output = void;

@singleton()
export class BulkAddTasksUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'BulkAddTasksUsecase';

  constructor(@inject(TaskRepository.TOKEN) private readonly taskRepository: TaskRepository) {}

  async run({ tasks }: Input): Promise<Output> {
    return this.taskRepository.bulkAdd(tasks);
  }
}
