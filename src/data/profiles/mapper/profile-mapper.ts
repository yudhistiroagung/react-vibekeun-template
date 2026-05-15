import type { Profile } from '@/domain/profiles/models/profile';
import type { ProfileEntity } from '../models/profile-entity';

export const profileEntityToDomain = (entity: ProfileEntity): Profile => ({
  id: entity.id as number,
  name: entity.name,
  createdAt: entity.createdAt,
});

export const profileDomainToEntity = (domain: Profile): ProfileEntity => ({
  id: domain.id,
  name: domain.name,
  createdAt: domain.createdAt,
});
