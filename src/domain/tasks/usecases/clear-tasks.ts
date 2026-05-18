import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import { TaskRepository } from '../task-repository';

type Input = void;
type Output = void;

@singleton()
export class ClearTasksUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'ClearTasksUsecase';

  constructor(
    @inject(TaskRepository.TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run(): Promise<Output> {
    return this.taskRepository.clear();
  }
}
