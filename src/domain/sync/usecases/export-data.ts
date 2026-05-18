import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';
import { GoalRepository } from '@/domain/goals/goal-repository';
import { ProfileRepository } from '@/domain/profiles/profile-repository';
import { TaskRepository } from '@/domain/tasks/task-repository';

type Input = void;
type Output = Blob;

@singleton()
export class ExportDataUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'ExportDataUsecase';

  constructor(
    @inject(ProfileRepository.TOKEN)
    private readonly profileRepository: ProfileRepository,
    @inject(GoalRepository.TOKEN)
    private readonly goalRepository: GoalRepository,
    @inject(TaskRepository.TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run(): Promise<Output> {
    const profiles = await this.profileRepository.getAll();
    const goals = await this.goalRepository.getAll();
    const tasks = await this.taskRepository.getAll();

    const data = {
      profiles,
      goals,
      tasks,
    };

    return new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
  }
}
