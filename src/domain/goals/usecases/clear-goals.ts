import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import { GoalRepository } from '../goal-repository';

type Input = void;
type Output = void;

@singleton()
export class ClearGoalsUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'ClearGoalsUsecase';

  constructor(@inject(GoalRepository.TOKEN) private readonly goalRepository: GoalRepository) {}

  async run(): Promise<Output> {
    return this.goalRepository.clear();
  }
}
