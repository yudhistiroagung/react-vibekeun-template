import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Task } from '../models/task';
import { TaskRepository } from '../task-repository';

type Input = void;
type Output = Task[];

@singleton()
export class GetAllTasksUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'GetAllTasksUsecase';

  constructor(
    @inject(TaskRepository.TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run(): Promise<Output> {
    return this.taskRepository.getAll();
  }
}
