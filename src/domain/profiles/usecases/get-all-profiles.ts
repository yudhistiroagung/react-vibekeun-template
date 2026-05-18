import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Profile } from '../models/profile';
import { ProfileRepository } from '../profile-repository';

type Input = void;
type Output = Profile[];

@singleton()
export class GetAllProfilesUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'GetAllProfilesUsecase';

  constructor(
    @inject(ProfileRepository.TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async run(): Promise<Output> {
    return this.profileRepository.getAll();
  }
}
