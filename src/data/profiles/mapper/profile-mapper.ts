import type { Profile } from '@/domain/profiles/models';
import type { ProfileEntity } from '../models';

export const profileEntityToDomain = (entity: ProfileEntity): Profile => ({
  id: entity.id,
  name: entity.name,
  isDefault: entity.isDefault,
  createdAt: entity.createdAt,
});

export const profileDomainToEntity = (domain: Profile): ProfileEntity => ({
  id: domain.id,
  name: domain.name,
  isDefault: domain.isDefault,
  createdAt: domain.createdAt,
});
