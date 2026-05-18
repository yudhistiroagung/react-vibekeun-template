import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';
import { GoalRepository } from '../goal-repository';
import type { Goal } from '../models/goal';

type Input = {
  goal: Omit<Goal, 'id' | 'createdAt'>;
};
type Output = Goal;

@singleton()
export class CreateGoalUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'CreateGoalUsecase';

  constructor(
    @inject(GoalRepository.TOKEN)
    private readonly goalRepository: GoalRepository,
  ) {}

  async run({ goal }: Input): Promise<Output> {
    return this.goalRepository.create(goal);
  }
}
