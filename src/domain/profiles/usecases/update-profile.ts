import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Profile } from '../models/profile';
import { ProfileRepository } from '../profile-repository';

type Input = {
  id: number;
  profile: Partial<Profile>;
};
type Output = Profile;

@singleton()
export class UpdateProfileUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'UpdateProfileUsecase';

  constructor(
    @inject(ProfileRepository.TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async run({ id, profile }: Input): Promise<Output> {
    return this.profileRepository.update(id, profile);
  }
}
