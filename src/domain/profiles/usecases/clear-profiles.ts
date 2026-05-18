import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import { ProfileRepository } from '../profile-repository';

type Input = void;
type Output = void;

@singleton()
export class ClearProfilesUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'ClearProfilesUsecase';

  constructor(
    @inject(ProfileRepository.TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async run(): Promise<Output> {
    return this.profileRepository.clear();
  }
}
