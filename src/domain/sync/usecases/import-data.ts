import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';
import { GoalRepository } from '@/domain/goals/goal-repository';
import { ProfileRepository } from '@/domain/profiles/profile-repository';
import { TaskRepository } from '@/domain/tasks/task-repository';

type Input = {
  file: File;
};
type Output = void;

@singleton()
export class ImportDataUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'ImportDataUsecase';

  constructor(
    @inject(ProfileRepository.TOKEN)
    private readonly profileRepository: ProfileRepository,
    @inject(GoalRepository.TOKEN)
    private readonly goalRepository: GoalRepository,
    @inject(TaskRepository.TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async run({ file }: Input): Promise<Output> {
    const text = await file.text();
    const data = JSON.parse(text);

    await this.profileRepository.clear();
    await this.goalRepository.clear();
    await this.taskRepository.clear();

    if (data.profiles && data.profiles.length > 0) {
      await this.profileRepository.bulkAdd(data.profiles);
    }
    if (data.goals && data.goals.length > 0) {
      await this.goalRepository.bulkAdd(data.goals);
    }
    if (data.tasks && data.tasks.length > 0) {
      await this.taskRepository.bulkAdd(data.tasks);
    }
  }
}
