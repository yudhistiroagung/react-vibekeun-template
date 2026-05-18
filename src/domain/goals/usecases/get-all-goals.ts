import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Goal } from '../models/goal';
import { GoalRepository } from '../goal-repository';

type Input = void;
type Output = Goal[];

@singleton()
export class GetAllGoalsUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'GetAllGoalsUsecase';

  constructor(@inject(GoalRepository.TOKEN) private readonly goalRepository: GoalRepository) {}

  async run(): Promise<Output> {
    return this.goalRepository.getAll();
  }
}
