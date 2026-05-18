import { inject, singleton } from 'tsyringe';

import type { BaseUsecase } from '@/cores/usecases/base-usecase';

import { ProfileRepository } from '../profile-repository';

type Input = {
  id: number;
};
type Output = void;

@singleton()
export class DeleteProfileUsecase implements BaseUsecase<Input, Output> {
  static readonly TOKEN = 'DeleteProfileUsecase';

  constructor(
    @inject(ProfileRepository.TOKEN)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async run({ id }: Input): Promise<Output> {
    return this.profileRepository.delete(id);
  }
}
