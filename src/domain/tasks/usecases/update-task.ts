import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Task } from '../models/task';
import { TaskRepository } from '../task-repository';

type Input = {
  id: number;
  task: Partial<Task>;
};
type Output = Task;

@singleton()
export class UpdateTaskUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'UpdateTaskUsecase';

  constructor(@inject(TaskRepository.TOKEN) private readonly taskRepository: TaskRepository) {}

  async run({ id, task }: Input): Promise<Output> {
    return this.taskRepository.update(id, task);
  }
}
