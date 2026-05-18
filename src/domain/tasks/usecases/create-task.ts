import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Task } from '../models/task';
import { TaskRepository } from '../task-repository';

type Input = {
  task: Omit<Task, 'id' | 'createdAt'>;
};
type Output = Task;

@singleton()
export class CreateTaskUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'CreateTaskUsecase';

  constructor(
    @inject(TaskRepository.TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run({ task }: Input): Promise<Output> {
    return this.taskRepository.create(task);
  }
}
