import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Task } from '../models/task';
import { TaskRepository } from '../task-repository';

type Input = {
  profileId: number;
  date: string;
};
type Output = Task[];

@singleton()
export class GetTasksByProfileIdAndDateUsecase
  implements BaseUsecase<Input, Output>
{
  static readonly TOKEN = 'GetTasksByProfileIdAndDateUsecase';

  constructor(
    @inject(TaskRepository.TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run({ profileId, date }: Input): Promise<Output> {
    return this.taskRepository.getByProfileIdAndDate(profileId, date);
  }
}
