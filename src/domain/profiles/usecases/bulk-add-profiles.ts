import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Profile } from '../models/profile';
import { ProfileRepository } from '../profile-repository';

type Input = {
  profiles: Profile[];
};
type Output = void;

@singleton()
export class BulkAddProfilesUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'BulkAddProfilesUsecase';

  constructor(
    @inject(ProfileRepository.TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async run({ profiles }: Input): Promise<Output> {
    return this.profileRepository.bulkAdd(profiles);
  }
}
