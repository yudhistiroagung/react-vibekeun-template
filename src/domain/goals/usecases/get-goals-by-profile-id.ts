import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Goal } from '../models/goal';
import { GoalRepository } from '../goal-repository';

type Input = {
  profileId: number;
};
type Output = Goal[];

@singleton()
export class GetGoalsByProfileIdUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'GetGoalsByProfileIdUsecase';

  constructor(@inject(GoalRepository.TOKEN) private readonly goalRepository: GoalRepository) {}

  async run({ profileId }: Input): Promise<Output> {
    return this.goalRepository.getByProfileId(profileId);
  }
}
