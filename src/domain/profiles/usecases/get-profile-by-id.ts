import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import type { Profile } from '../models/profile';
import { ProfileRepository } from '../profile-repository';

type Input = {
  id: number;
};
type Output = Profile | undefined;

@singleton()
export class GetProfileByIdUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'GetProfileByIdUsecase';

  constructor(@inject(ProfileRepository.TOKEN) private readonly profileRepository: ProfileRepository) {}

  async run({ id }: Input): Promise<Output> {
    return this.profileRepository.getById(id);
  }
}
