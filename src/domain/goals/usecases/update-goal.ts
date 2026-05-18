import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Goal } from '../models/goal';
import { GoalRepository } from '../goal-repository';

type Input = {
  id: number;
  goal: Partial<Goal>;
};
type Output = Goal;

@singleton()
export class UpdateGoalUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'UpdateGoalUsecase';

  constructor(@inject(GoalRepository.TOKEN) private readonly goalRepository: GoalRepository) {}

  async run({ id, goal }: Input): Promise<Output> {
    return this.goalRepository.update(id, goal);
  }
}
