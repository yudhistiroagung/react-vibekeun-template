import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Profile } from '../models/profile';
import { ProfileRepository } from '../profile-repository';

type Input = {
  profile: Omit<Profile, 'id' | 'createdAt'>;
};
type Output = Profile;

@singleton()
export class CreateProfileUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'CreateProfileUsecase';

  constructor(@inject(ProfileRepository.TOKEN) private readonly profileRepository: ProfileRepository) {}

  async run({ profile }: Input): Promise<Output> {
    return this.profileRepository.create(profile);
  }
}
