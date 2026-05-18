import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import { GoalRepository } from '../goal-repository';

type Input = {
  id: number;
};
type Output = void;

@singleton()
export class DeleteGoalUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'DeleteGoalUsecase';

  constructor(
    @inject(GoalRepository.TOKEN)
    private readonly goalRepository: GoalRepository,
  ) {}

  async run({ id }: Input): Promise<Output> {
    return this.goalRepository.delete(id);
  }
}
