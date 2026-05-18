import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Goal } from '../models/goal';
import { GoalRepository } from '../goal-repository';

type Input = {
  goals: Goal[];
};
type Output = void;

@singleton()
export class BulkAddGoalsUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'BulkAddGoalsUsecase';

  constructor(@inject(GoalRepository.TOKEN) private readonly goalRepository: GoalRepository) {}

  async run({ goals }: Input): Promise<Output> {
    return this.goalRepository.bulkAdd(goals);
  }
}
